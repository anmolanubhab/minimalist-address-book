import { supabase } from "@/lib/supabase";
import type { Dashboar47531cContactsRow } from "@/types/database";
import { Contact } from "@/types/contact";

function mapRowToContact(row: Dashboar47531cContactsRow): Contact {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    createdAt: row.created_at,
    isFavorite: row.is_favorite,
  };
}

export async function getContacts(options?: {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "created_at" | "is_favorite";
  sortDir?: "asc" | "desc";
}): Promise<Contact[]> {
  const search = options?.search;
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 100;
  const sortBy = options?.sortBy ?? "created_at";
  const sortDir = options?.sortDir ?? "desc";

  let query = supabase
    .from("dashboar_47531c_contacts")
    .select("*");

  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching contacts:", error);
    throw new Error(error.message);
  }

  return (data as Dashboar47531cContactsRow[] || []).map(mapRowToContact);
}

export async function getContactById(id: string): Promise<Contact> {
  const { data, error } = await supabase
    .from("dashboar_47531c_contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching contact with id ${id}:`, error);
    throw new Error(error.message);
  }

  return mapRowToContact(data as Dashboar47531cContactsRow);
}

export async function createContact(name: string, phone: string): Promise<Contact> {
  const { data, error } = await supabase
    .from("dashboar_47531c_contacts")
    .insert([{ name, phone, is_favorite: false }])
    .select()
    .single();

  if (error) {
    console.error("Error creating contact:", error);
    throw new Error(error.message);
  }

  return mapRowToContact(data as Dashboar47531cContactsRow);
}

export async function updateContact(
  id: string,
  updates: Partial<Omit<Contact, "id" | "createdAt">>
): Promise<Contact> {
  const dbUpdates: Partial<Omit<Dashboar47531cContactsRow, "id" | "created_at">> = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.isFavorite !== undefined) dbUpdates.is_favorite = updates.isFavorite;

  const { data, error } = await supabase
    .from("dashboar_47531c_contacts")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating contact ${id}:`, error);
    throw new Error(error.message);
  }

  return mapRowToContact(data as Dashboar47531cContactsRow);
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from("dashboar_47531c_contacts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting contact:", error);
    throw new Error(error.message);
  }
}

export async function toggleFavorite(id: string, isFavorite: boolean): Promise<Contact> {
  const { data, error } = await supabase
    .from("dashboar_47531c_contacts")
    .update({ is_favorite: isFavorite })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error toggling favorite:", error);
    throw new Error(error.message);
  }

  return mapRowToContact(data as Dashboar47531cContactsRow);
}
