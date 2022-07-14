import { useAuthState } from "contexts";
import React from "react";
import { Navigate, Route } from "react-router-dom";


const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      element={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Navigate to="/login" replace />
        ) : (
          <Component />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
