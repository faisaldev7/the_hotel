import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderHistory as createOrderHistoryApi } from "../../services/apiOrderHistories";
import toast from "react-hot-toast";

export function useCreateOrderHistory() {
  const queryClient = useQueryClient();

  const { mutate: createOrderHistory, isLoading: isCreating } = useMutation({
    mutationFn: createOrderHistoryApi,
    onSuccess: () => {
      // toast.success("Guest successfully created");
      queryClient.invalidateQueries({ queryKey: ["order_histories"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createOrderHistory };
}
