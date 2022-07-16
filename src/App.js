import axios from "axios";
import { ProtectedRoute } from "components/ProtectedRoute";
import { AuthProvider } from "contexts/AuthContext";
import { lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

const LoginPage = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./features/login/LoginPage"
  )
);

const SignupPage = lazy(() =>
  import(/* webpackChunkName: "signup" */ "./features/signup/SignupPage")
);

const Dashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ "./features/dashboard/Dashboard")
);

axios.defaults.baseURL = "http://authentication-api-dev.us-west-2.elasticbeanstalk.com";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner animation="grow" className="loader"/>}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  );
}
