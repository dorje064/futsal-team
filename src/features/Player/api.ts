import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Player } from "./types";

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

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
    } catch (err) {
      setError("Failed to save players.");
      console.error("Error saving players:", err);
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

      console.log("All players updated successfully!");
    } catch (err) {
      setError("Failed to update players.");
      console.error("Firestore update error:", err);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return { players, loading, error, savePlayers, updatePlayers, saving };
};
