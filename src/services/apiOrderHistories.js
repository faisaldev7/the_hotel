/* eslint-disable no-unused-vars */
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getOrderHistories({ filter, sortBy, page }) {
  let query = supabase
    .from("order_histories")
    .select("id, created_at, booking_id, cart, amount", {
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
    throw new Error("Order Histories not found");
  }

  return { data, count };
}

export async function createOrderHistory(newOrderHistory) {
  // 1. Create
  let query = supabase.from("order_histories").insert([{ ...newOrderHistory }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Order history could not be created");
  }

  return data;
}
