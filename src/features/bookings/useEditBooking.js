import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  console.log("updating");

  const { mutate: editBooking, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBookingData, id }) =>
      createEditBooking(newBookingData, id),
    onSuccess: () => {
      toast.success("Booking successfully updated");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editBooking };
}
