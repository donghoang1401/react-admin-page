// Context/actions.js

import { queryClient } from "App";
import axios from "axios";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: loginPayload,
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios({
      url: `/api/auth/signin`,
      ...requestOptions,
    });

    let data = response.data;

    if (!data) {
      throw new Error("login error");
    }
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("currentUser", JSON.stringify(data));
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export const logout = async (dispatch) =>  {
  queryClient.removeQueries(["fetchingUsers"], {})
  await dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
