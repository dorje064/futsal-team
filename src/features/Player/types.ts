export interface Player {
  id: number;
  name: string;
  skill: number;
  created_at?: string;
}

export interface PlayerFormData {
  name: string;
  skill: number;
}