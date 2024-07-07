import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditGuest() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editGuest, isLoading: isEditing } = useMutation({
    mutationFn: ({ newGuestData, id }) => createEditGuest(newGuestData, id),
    onSuccess: () => {
      toast.success("Guest successfully updated");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      navigate("/guests");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editGuest };
}
