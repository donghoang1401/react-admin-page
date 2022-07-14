import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useFetchingUsers = ({ auth, token, ...options }) => {
  const [items, setItems] = useState([]);

  const { data: users, ...rest } = useQuery(
    "fetchingUsers",
    () =>
      axios({
        method: "get",
        url: `/api/user/${auth}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      onSuccess: (data) => console.info(data),
      onError: (err) => console.error(err),
      enabled: !!auth,
      ...options,
    }
  );

  useEffect(() => {
    if (users?.data) setItems(users?.data);
    return () => {
      setItems([]);
    };
  }, [users?.data]);

  return {
    items,
    ...rest,
  };
};
