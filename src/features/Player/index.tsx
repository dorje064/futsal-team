import { useEffect, useState } from "react";
import { SkillInput, TextInput } from "../../components/input";

import { usePlayers } from "./api";
import { Player } from "./types";
import { ConfirmationModal } from "../../components/confirmationModal";

export const PlayerList = () => {
  const { players, loading, savePlayers, updatePlayers, saving, deletePlayer } = usePlayers();
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);
  const [deletingPlayer, setDeletingPlayer] = useState<string | null>()

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

  return (
    <>
      <div className='d-flex justify-content-center mb-5'>
        <div>
          <h2 className="font-bold text-lg mb-2">Players</h2>

          {localPlayers.map((player: Player) => (
            <div key={player.id} className="btn-toolbar mb-3">
              <TextInput
                value={player.name}
                onChange={({ target }: { target: { value: string } }) =>
                  handleChange(player.id, "name", target.value)
                }
                handleDelete={() => { setDeletingPlayer(player.id) }}
              />
              <SkillInput
                selectedSkill={player.skill}
                onSkillSelect={(number: string) =>
                  handleChange(player.id, "skill", number)
                }
              />
            </div>
          ))}

          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary mx-5"
              onClick={addPlayer}
            >
              ({localPlayers.length}) Add Player
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Players"}
            </button>
          </div>

          {deletingPlayer &&
            <ConfirmationModal
              show={!!deletePlayer}
              title="Deleting Player"
              text="Are you sure to delete the Player ? You can't retrive data once your delete "
              onClose={() => setDeletingPlayer(null)}
              onSave={() => {
                deletePlayer(deletingPlayer as string);
                setDeletingPlayer(null);
              }}
            />}
        </div>
      </div>
    </>
  );
};
