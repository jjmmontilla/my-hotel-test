export interface Reservation {
  id: number;
  full_name: string;
  hotel?: string;
  person_num: number;
  created_at: string;
  valid_until: string;
  valid_from: string;
  plans?: string[];
}
