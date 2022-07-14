import { queryClient } from "App";
import axios from "axios";
import { useAuthState } from "contexts";
import { useMutation } from "react-query";

export const useRegisterUser = ({ setShow }) => {
  const { token } = useAuthState();
  const mutate = useMutation(
    (payload) =>
      axios({
        url: "/api/user",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        data: payload,
      }),
    {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: async () => {
        await queryClient.refetchQueries(["fetchingUsers"], {});
        setShow(false)
      },
    }
  );

  return mutate;
};
