// src/App.jsx - Main Application with Router and NotificationProvider
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./Router/Layout";
import DashboardPage from "./Pages/DashboardPage";
import ProjectsPage from "./Pages/ProjectsPage";
import ProjectDetailPage from "./Pages/ProjectDetailPage";
import SimpleKanbanBoard from "./Components/SimpleKanbanBoard";
import TeamPage from "./Pages/TeamPage";
import SettingsPage from "./Pages/SettingsPage";
import { NotificationProvider } from "./contexts/NotificationContext";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Main application routes with layout */}
            <Route path="/" element={<Layout />}>
              {/* Redirect from root to dashboard */}
              <Route index element={<Navigate to="/dashboard" replace />} />

              {/* Dashboard page */}
              <Route path="dashboard" element={<DashboardPage />} />

              {/* Projects routes */}
              <Route path="projects">
                <Route index element={<ProjectsPage />} />
                <Route path=":projectId" element={<ProjectDetailPage />} />
              </Route>

              {/* Kanban Board routes */}
              <Route path="kanban">
                <Route index element={<SimpleKanbanBoard />} />
                <Route path=":projectId" element={<SimpleKanbanBoard />} />
              </Route>

              {/* Team page */}
              <Route path="team" element={<TeamPage />} />

              {/* Settings page */}
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
