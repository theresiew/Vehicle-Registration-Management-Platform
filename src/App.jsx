import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import VehicleFormPage from "./pages/VehicleFormPage";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicle/new"
          element={
            <ProtectedRoute>
              <VehicleFormPage mode="create" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicle/:id"
          element={
            <ProtectedRoute>
              <VehicleDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicle/:id/edit"
          element={
            <ProtectedRoute>
              <VehicleFormPage mode="edit" />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
