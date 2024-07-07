import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getGuest } from "../../services/apiGuests";

export function useGuest() {
  const { guestId } = useParams();

  const { isLoading, data: guest } = useQuery({
    queryKey: ["guest", guestId],
    queryFn: () => getGuest(guestId),
    retry: false,
  });

  return { isLoading, guest };
}
