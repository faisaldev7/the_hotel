import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  //FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY

  const { isLoading, data: { data: guests, count } = {} } = useQuery({
    queryKey: ["guests", filter, sortBy, page],
    queryFn: () => getGuests({ filter, sortBy, page }),
  });

  // PREFETCHING

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, sortBy, page + 1],
      queryFn: () => getGuests({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, sortBy, page + 1],
      queryFn: () => getGuests({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, guests, count };
}
