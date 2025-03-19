import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Team } from "./types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false)

  // Fetch Teams from Firestore
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const teamsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Team[];
      setTeams(teamsData);
    } catch (err) {
      setError("Failed to fetch Teams.");
      console.error("Error fetching Teams:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveTeams = async (newTeams: Team[]) => {
    setSaving(true);
    try {
      const promises = newTeams.map(({ name }) => addDoc(collection(db, "teams"), { name }));
      await Promise.all(promises);
      setTeams([...teams, ...newTeams]);
      toast.success(`${newTeams.length} new Teams saved successfully!`)
    } catch (err) {
      setError("Failed to save Teams.");
      toast.error("Error saving Teams:");
    } finally {
      setSaving(false);
    }
  };

  // Update existing team in Firestore
  const updateTeams = async (updatedTeams: Team[]) => {
    if (updatedTeams.length === 0) return;

    try {
      const updatePromises = updatedTeams.map(async (team) => {
        const teamId = String(team.id);
        const teamRef = doc(db, "teams", teamId)

        // 🔍 Check if the document exists
        const docSnap = await getDoc(teamRef);
        if (!docSnap.exists()) {
          console.error(`team document with ID ${teamId} not found!`);
          return;
        }

        await updateDoc(teamRef, { name: team.name, players: team.players || [] });
        console.log(`team ${team.id} updated successfully!`);
      });

      await Promise.all(updatePromises);

      setTeams((prevTeams) =>
        prevTeams.map((p) =>
          updatedTeams.find((u) => u.id === p.id) ? { ...p, ...updatedTeams.find((u) => u.id === p.id) } : p
        )
      );

      toast.success(`${updatedTeams.length} Teams updated successfully!`);
    } catch (err) {
      setError("Failed to update Teams.");
      console.error("Firestore update error:", err);
    }
  };

  const deleteTeam = async (teamId: string) => {
    setDeleting(true);
    try {
      const teamRef = doc(db, "teams", teamId);

      const docSnap = await getDoc(teamRef);
      if (!docSnap.exists()) {
        toast.error(`Team with ID ${teamId} not found!`);
        return;
      }

      await deleteDoc(teamRef);
      setTeams((prevTeams) => prevTeams.filter((p) => p.id !== teamId));
      toast.success(`team ${teamId} deleted successfully!`);
    } catch (err) {
      setError("Failed to delete team.");
      toast.error("Error deleting team.");
      console.error("Error deleting team:", err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, loading, error, saveTeams, updateTeams, saving, deleteTeam, deleting };
};
