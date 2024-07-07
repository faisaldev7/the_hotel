import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderHistories } from "../../services/apiOrderHistories";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useOrderHistories() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY

  const { isLoading, data: { data: order_histories, count } = {} } = useQuery({
    queryKey: ["order_histories", sortBy, page],
    queryFn: () => getOrderHistories({ sortBy, page }),
  });

  // PREFETCHING

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["order_histories", sortBy, page + 1],
      queryFn: () => getOrderHistories({ sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["order_histories", sortBy, page + 1],
      queryFn: () => getOrderHistories({ sortBy, page: page - 1 }),
    });

  return { isLoading, order_histories, count };
}
