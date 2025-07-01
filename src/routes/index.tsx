// routes.tsx
import { Navigate } from "react-router-dom";
import { Login, Register, NotFound } from "../pages";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
