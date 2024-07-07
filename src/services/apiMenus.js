/* eslint-disable no-unused-vars */
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getMenus({ filter, sortBy, page }) {
  let query = supabase
    .from("menus")
    .select("id, created_at, name, unitPrice, soldOut, image", {
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
    throw new Error("Menus not found");
  }

  return { data, count };
}
