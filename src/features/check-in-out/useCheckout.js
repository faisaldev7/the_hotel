import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Booking successfully checked out");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Error check out");
    },
  });
  return { isCheckingOut, checkout };
}
