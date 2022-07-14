import { queryClient } from "App";
import axios from "axios";
import { useAuthState } from "contexts";
import { useMutation } from "react-query";

export const useDeleteUser = ({ setShowConfirmDialog }) => {
  const { token } = useAuthState();
  const { mutateAsync, ...mutate } = useMutation(
    (id) =>
      axios({
        method: "delete",
        url: `/api/user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }),
    {
      onSuccess: async (data) => {
        await queryClient.refetchQueries(["fetchingUsers"], {});
        setShowConfirmDialog(false)
      },
    }
  );

  const handleDeleteUser = async (id) => {
    try {
      await mutateAsync(id);
    } catch (e) {}
  };

  return {
    ...mutate,
    handleDeleteUser,
  };
};
