// path: types/database.ts
// Auto-generated from the applied Supabase schema (schema_version 1). Regenerated
// the next time this project's database is (re)provisioned — avoid hand-editing.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Dashboar47531cContactsRow {
  id: string;
  name: string;
  phone: string;
  created_at: string;
  is_favorite: boolean;
}

export interface Dashboar47531cContactsInsert {
  id: string;
  name: string;
  phone: string;
  created_at: string;
  is_favorite: boolean;
}

export type Dashboar47531cContactsUpdate = Partial<Dashboar47531cContactsInsert>;
