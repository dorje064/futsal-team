import { Player } from "../Player/types";

export interface Team {
  players: any;
  id: string;
  name: string;
  created_at?: string;
}

export interface TeamFormData {
  id: string;
  name: string;
  players?: Player[]
}