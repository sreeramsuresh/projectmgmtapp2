import React from "react";
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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();

  // Sample project data
  const projects = [
    {
      id: "dev-portal",
      name: "Developer Portal",
      description:
        "A centralized platform for API documentation and developer resources",
      progress: 75,
      tasks: { total: 24, completed: 18 },
      deadline: "Mar 15, 2025",
      team: ["AJ", "TS", "ML"],
    },
    {
      id: "mobile-app",
      name: "Mobile App Redesign",
      description: "Complete UI/UX overhaul of the mobile application",
      progress: 30,
      tasks: { total: 32, completed: 9 },
      deadline: "Apr 10, 2025",
      team: ["JC", "CK", "ML"],
    },
    {
      id: "analytics",
      name: "Analytics Dashboard",
      description: "Data visualization tools for business insights",
      progress: 60,
      tasks: { total: 18, completed: 11 },
      deadline: "Mar 25, 2025",
      team: ["TS", "JC", "AJ"],
    },
    {
      id: "auth-service",
      name: "Authentication Service",
      description:
        "Secure authentication system with JWT and OAuth integration",
      progress: 90,
      tasks: { total: 15, completed: 13 },
      deadline: "Mar 5, 2025",
      team: ["JC", "CK"],
    },
  ];

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
          onClick={() => console.log("Create new project")}
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
                    {project.team.map((member, index) => (
                      <Avatar
                        key={index}
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: "0.8rem",
                          bgcolor:
                            member === "AJ"
                              ? "#3f51b5"
                              : member === "TS"
                              ? "#f44336"
                              : member === "ML"
                              ? "#4caf50"
                              : member === "JC"
                              ? "#ff9800"
                              : "#9c27b0",
                        }}
                      >
                        {member}
                      </Avatar>
                    ))}
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
                  onClick={() => navigate(`/kanban/${project.id}`)}
                >
                  Kanban Board
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectsPage;
