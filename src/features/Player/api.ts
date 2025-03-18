import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Player } from "./types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false)

  // Fetch players from Firestore
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "players"));
      const playersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Player[];
      setPlayers(playersData);
    } catch (err) {
      setError("Failed to fetch players.");
      console.error("Error fetching players:", err);
    } finally {
      setLoading(false);
    }
  };

  // Save new players to Firestore
  const savePlayers = async (newPlayers: Player[]) => {
    setSaving(true);
    try {
      const promises = newPlayers.map(({ name, skill }) => addDoc(collection(db, "players"), { name, skill }));
      await Promise.all(promises);
      setPlayers([...players, ...newPlayers]); // Update local state
      toast.success(`${newPlayers.length} new players saved successfully!`)
    } catch (err) {
      setError("Failed to save players.");
      toast.error("Error saving players:");
    } finally {
      setSaving(false);
    }
  };

  // Update existing player in Firestore
  const updatePlayers = async (updatedPlayers: Player[]) => {
    if (updatedPlayers.length === 0) return;

    try {
      const updatePromises = updatedPlayers.map(async (player) => {
        const playerId = String(player.id);
        const playerRef = doc(db, "players", playerId)

        // 🔍 Check if the document exists
        const docSnap = await getDoc(playerRef);
        if (!docSnap.exists()) {
          console.error(`Player document with ID ${playerId} not found!`);
          return;
        }

        await updateDoc(playerRef, { name: player.name, skill: player.skill });
        console.log(`Player ${player.id} updated successfully!`);
      });

      await Promise.all(updatePromises); // Wait for all updates
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) =>
          updatedPlayers.find((u) => u.id === p.id) ? { ...p, ...updatedPlayers.find((u) => u.id === p.id) } : p
        )
      );

      toast.success(`${updatedPlayers.length} Players updated successfully!`);
    } catch (err) {
      setError("Failed to update players.");
      console.error("Firestore update error:", err);
    }
  };

  const deletePlayer = async (playerId: string) => {
    setDeleting(true);
    try {
      const playerRef = doc(db, "players", playerId);

      const docSnap = await getDoc(playerRef);
      if (!docSnap.exists()) {
        toast.error(`Player with ID ${playerId} not found!`);
        return;
      }

      await deleteDoc(playerRef);
      setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== playerId));
      toast.success(`Player ${playerId} deleted successfully!`);
    } catch (err) {
      setError("Failed to delete player.");
      toast.error("Error deleting player.");
      console.error("Error deleting player:", err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return { players, loading, error, savePlayers, updatePlayers, saving, deletePlayer, deleting };
};
