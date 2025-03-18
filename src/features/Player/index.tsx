import { Player } from './types';
import { SkillInput, TextInput } from '../../components/input';
import { useState } from 'react';

// interface PlayerListProps {
//   players: Player[];
//   onEdit: (player: Player) => void;
//   onDelete: (player: Player) => void;
// }

export const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = () => {
    setPlayers([...players, { id: Date.now(), name: '', skill: 0 }]);
  };

  const handleChange = (id, field, value) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, [field]: value } : player
    ));
  };

  return (
    <div className='px-auto'>
      <h2 className="font-bold text-lg mb-2">Players</h2>
      {players.map((player: Player) => (
        <div
          key={player.id}
          className="btn-toolbar mb-3"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <TextInput
            value={player.name}
            onChange={({ target }: { target: { value: string } }) => {
              handleChange(player.id, 'name', target.value)
            }} />
          <SkillInput
            selectedSkill={player.skill}
            onChange={({ target }: { target: { value: string } }) => {
              handleChange(player.id, 'skill', target.value)
            }}
          />
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={addPlayer}
      >
        ({players.length}) Add Player
      </button>
    </div>
  )
}