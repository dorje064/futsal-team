export interface Player {
  id: string;
  name: string;
  skill: number;
  created_at?: string;
}

export interface PlayerFormData {
  name: string;
  skill: number;
}