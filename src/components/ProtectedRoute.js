import { useAuthState } from "contexts";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { userDetails } = useAuthState();
  if (!userDetails) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
