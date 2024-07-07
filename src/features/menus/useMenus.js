import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMenus } from "../../services/apiMenus";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useMenus() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  //FILTER
  const filterValue = searchParams.get("soldOut");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "soldOut", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY

  const { isLoading, data: { data: menus, count } = {} } = useQuery({
    queryKey: ["menus", filter, sortBy, page],
    queryFn: () => getMenus({ filter, sortBy, page }),
  });

  // PREFETCHING

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["menus", filter, sortBy, page + 1],
      queryFn: () => getMenus({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["menus", filter, sortBy, page + 1],
      queryFn: () => getMenus({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, menus, count };
}
