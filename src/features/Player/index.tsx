import { useEffect, useState } from "react";
import { SkillInput, TextInput } from "../../components/input";

import { usePlayers } from "./api";
import { Player } from "./types";

export const PlayerList = () => {
  const { players, loading, error, savePlayers, updatePlayers, saving } = usePlayers();
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);

  useEffect(() => {
    players && setLocalPlayers(players)
  }, [players])

  const addPlayer = () => {
    setLocalPlayers([...localPlayers, { id: Date.now().toString(), name: "", skill: 0 }]);
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    setLocalPlayers(localPlayers.map(player =>
      player.id === id ? { ...player, [field]: value } : player
    ));
  };

  const handleSubmit = async () => {
    const newPlayers = localPlayers.filter(
      (localPlayer) => !players.some((savedPlayer) => savedPlayer.id === localPlayer.id)
    );

    const modifiedPlayers = localPlayers.filter((localPlayer) => {
      const savedPlayer = players.find((p) => p.id === localPlayer.id);
      return savedPlayer && (savedPlayer.name !== localPlayer.name || savedPlayer.skill !== localPlayer.skill);
    });

    if (newPlayers.length > 0) {
      await savePlayers(newPlayers);
    }

    if (modifiedPlayers.length > 0) {
      await updatePlayers(modifiedPlayers)
    }
  }

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-auto">
      <h2 className="font-bold text-lg mb-2">Players</h2>

      {localPlayers.map((player: Player) => (
        <div key={player.id} className="btn-toolbar mb-3">
          <TextInput
            value={player.name}
            onChange={({ target }: { target: { value: string } }) =>
              handleChange(player.id, "name", target.value)
            }
          />
          <SkillInput
            selectedSkill={player.skill}
            onSkillSelect={(number: string) =>
              handleChange(player.id, "skill", number)
            }
          />
        </div>
      ))}

      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={addPlayer}>
        ({localPlayers.length}) Add Player
      </button>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleSubmit}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Players"}
      </button>
    </div>
  );
};
