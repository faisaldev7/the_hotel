/* eslint-disable no-unused-vars */
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getGuests({ filter, sortBy, page }) {
  let query = supabase
    .from("guests")
    .select("id, created_at, fullName, email, nationality, nationalId", {
      count: "exact",
    });

  if (filter) query = query.eq(filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Guests not found");
  }

  return { data, count };
}

export async function getGuest(id) {
  console.log(id);
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Guest not found");
  }

  return data;
}

export async function createEditGuest(newGuest, id) {
  // 1. Create/edit guest
  let query = supabase.from("guests");

  // A) CREATE
  if (!id) query = query.insert([{ ...newGuest }]);

  // B) EDIT
  if (id) query = query.update({ ...newGuest }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function deleteGuest(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }
  return data;
}
