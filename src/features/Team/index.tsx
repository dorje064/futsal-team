import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { useTeams } from "./api"
import { Team } from "./types";
import { TextInput } from "../../components/input";
import { ConfirmationModal } from "../../components/confirmationModal";
import { usePlayers } from "../Player/api";
import { toast } from "react-toastify";
import { MatchForm } from "./match";

export const Teams = () => {
  const { teams, loading, saveTeams, updateTeams, saving, deleteTeam, deleting } = useTeams()
  const { players } = usePlayers()
  const [localTeams, setLocalTeams] = useState<Team[]>([]);
  const [deletingTeam, setDeletingTeam] = useState<string | null>()
  const [matchDetail, setMatchDetail] = useState<{ title: string, playerNumber: number }>({ title: '', playerNumber: 0 })

  useEffect(() => {
    teams && setLocalTeams(teams)
  }, [teams])

  const addTeam = () => {
    const maxTeamNumber = players.length / matchDetail.playerNumber
    if (maxTeamNumber < localTeams.length) return toast.warn('Not enough players to add more team')
    setLocalTeams([...localTeams, { id: Date.now().toString(), name: "" }]);
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    setLocalTeams(localTeams.map(teams =>
      teams.id === id ? { ...teams, [field]: value } : teams
    ));
  };

  const handleSubmit = async () => {
    const newTeams = localTeams.filter(
      (localTeam) => !teams.some((savedTeam) => savedTeam.id === localTeam.id)
    );

    const modifiedTeams = localTeams.filter((localTeam) => {
      const savedTeam = teams.find((p) => p.id === localTeam.id);
      return savedTeam && (savedTeam.name !== localTeam.name);
    });

    if (newTeams.length > 0) {
      await saveTeams(newTeams);
    }

    if (modifiedTeams.length > 0) {
      await updateTeams(modifiedTeams)
    }
  }

  if (loading) return <p>Loading teams...</p>;

  const matchInfo = matchDetail.title && matchDetail.playerNumber

  if (!matchInfo)
    return (<MatchForm show={!matchInfo} saveMatch={(data) => { setMatchDetail(data) }} />)

  return (
    <div>
      <div className='d-flex justify-content-center mb-5'>
        <h2 className="font-bold text-lg mb-2">Teams</h2>

        {localTeams.map((team: Team) => (
          <div key={team.id} className="btn-toolbar mb-3">
            <TextInput
              value={team.name}
              onChange={({ target }: { target: { value: string } }) =>
                handleChange(team.id, "name", target.value)
              }
              handleDelete={() => { setDeletingTeam(team.id) }}
            />
          </div>
        ))}

        <div className="d-flex">
          <Button
            className="btn btn-primary mx-5"
            onClick={addTeam}
          >
            ({localTeams.length}) Add Team
          </Button>

          <Button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Teams"}
          </Button>
        </div>

        {deletingTeam &&
          <ConfirmationModal
            show={!!deletingTeam}
            title="Deleting Team"
            text="Are you sure to delete the Team ? You can't retrive data once you delete."
            onClose={() => setDeletingTeam(null)}
            onSave={() => {
              deleteTeam(deletingTeam as string);
              setDeletingTeam(null);
            }}
          />}

      </div>
    </div>
  )

}