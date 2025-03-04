// src/App.jsx - Updated with Redux and Auth Routes
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Redux Store
import store from "./redux/store";

// Authentication
import { initializeMsal } from "./auth/msalService";

// Layout and Routes
import Layout from "./Router/Layout";
import ProtectedRoute from "./Router/ProtectedRoute";

// Pages
import LoginPage from "./Pages/LoginPage";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import DashboardPage from "./Pages/DashboardPage";
import ProjectsPage from "./Pages/ProjectsPage";
import ProjectDetailPage from "./Pages/ProjectDetailPage";
import SimpleKanbanBoard from "./Components/SimpleKanbanBoard";
import TeamPage from "./Pages/TeamPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff4081",
      dark: "#9a0036",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App = () => {
  // Initialize Microsoft Authentication on app start
  useEffect(() => {
    initializeMsal();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Redirect from root to dashboard if authenticated, otherwise to login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected routes with layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                {/* Dashboard page - accessible to all authenticated users */}
                <Route path="dashboard" element={<DashboardPage />} />

                {/* Projects routes - accessible to all authenticated users */}
                <Route path="projects">
                  <Route index element={<ProjectsPage />} />
                  <Route path=":projectId" element={<ProjectDetailPage />} />
                </Route>

                {/* Kanban Board routes - accessible to all authenticated users */}
                <Route path="kanban">
                  <Route index element={<SimpleKanbanBoard />} />
                  <Route path=":projectId" element={<SimpleKanbanBoard />} />
                </Route>

                {/* Team page - accessible to managers and admins */}
                <Route
                  path="team"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "manager"]}>
                      <TeamPage />
                    </ProtectedRoute>
                  }
                />

                {/* Settings page - accessible to admins only */}
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Profile page - accessible to all authenticated users */}
                <Route path="profile" element={<ProfilePage />} />

                {/* 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
