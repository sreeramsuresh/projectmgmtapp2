import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Chip,
  Avatar,
  AvatarGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateProjectDialog from "../Components/CreateProjectDialog";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: "dev-portal",
      name: "Developer Portal",
      description:
        "A centralized platform for API documentation and developer resources",
      progress: 75,
      tasks: { total: 24, completed: 18 },
      deadline: "Mar 15, 2025",
      team: [1, 3, 2], // Reference to team member IDs
      category: "development",
      tags: ["documentation", "api"],
    },
    {
      id: "mobile-app",
      name: "Mobile App Redesign",
      description: "Complete UI/UX overhaul of the mobile application",
      progress: 30,
      tasks: { total: 32, completed: 9 },
      deadline: "Apr 10, 2025",
      team: [4, 5, 3],
      category: "design",
      tags: ["mobile", "ui", "ux"],
    },
    {
      id: "analytics",
      name: "Analytics Dashboard",
      description: "Data visualization tools for business insights",
      progress: 60,
      tasks: { total: 18, completed: 11 },
      deadline: "Mar 25, 2025",
      team: [2, 4, 1],
      category: "development",
      tags: ["dashboard", "data"],
    },
    {
      id: "auth-service",
      name: "Authentication Service",
      description:
        "Secure authentication system with JWT and OAuth integration",
      progress: 90,
      tasks: { total: 15, completed: 13 },
      deadline: "Mar 5, 2025",
      team: [4, 5],
      category: "infrastructure",
      tags: ["security", "authentication"],
    },
  ]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Team member mapping for UI display
  const teamMemberMap = {
    1: { initials: "AJ", color: "#3f51b5" },
    2: { initials: "TS", color: "#f44336" },
    3: { initials: "ML", color: "#4caf50" },
    4: { initials: "JC", color: "#ff9800" },
    5: { initials: "CK", color: "#9c27b0" },
  };

  const handleCreateProject = (newProject) => {
    // Create slug-like ID from name
    const id = newProject.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");

    // Add the new project with generated ID
    const projectWithId = {
      ...newProject,
      id: id,
    };

    setProjects([...projects, projectWithId]);

    // Show success message
    setSnackbar({
      open: true,
      message: `Project "${newProject.name}" created successfully!`,
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const getStatusColor = (progress) => {
    if (progress < 40) return "#f44336"; // Red
    if (progress < 75) return "#ff9800"; // Orange
    return "#4caf50"; // Green
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} key={project.id}>
            <Card
              variant="outlined"
              sx={{
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {project.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getStatusColor(project.progress),
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {project.progress}%
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Chip
                    label={`Tasks: ${project.tasks.completed}/${project.tasks.total}`}
                    size="small"
                    sx={{ bgcolor: "background.default" }}
                  />
                  <Chip
                    label={`Due: ${project.deadline}`}
                    size="small"
                    sx={{ bgcolor: "background.default" }}
                  />
                </Box>

                {project.tags && project.tags.length > 0 && (
                  <Box
                    sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}
                  >
                    {project.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    ))}
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Team:
                  </Typography>
                  <AvatarGroup max={4}>
                    {project.team.map((memberId) => {
                      const member = teamMemberMap[memberId];
                      return (
                        <Avatar
                          key={memberId}
                          sx={{
                            width: 30,
                            height: 30,
                            fontSize: "0.8rem",
                            bgcolor: member.color,
                          }}
                        >
                          {member.initials}
                        </Avatar>
                      );
                    })}
                  </AvatarGroup>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    navigate(`/projects/${project.id}`, {
                      state: { initialTab: 1 },
                    })
                  }
                >
                  Kanban Board
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateProject={handleCreateProject}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectsPage;
