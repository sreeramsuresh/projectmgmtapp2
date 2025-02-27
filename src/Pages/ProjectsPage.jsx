// src/Pages/ProjectsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

// Sample project data
const projects = [
  {
    id: "dev-portal",
    name: "Developer Portal",
    description: "Central hub for API documentation and developer resources",
    progress: 75,
    team: ["Alex", "Jordan", "Taylor"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Redesign",
    description: "Refresh the UI/UX of our mobile application",
    progress: 30,
    team: ["Morgan", "Casey"],
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Real-time metrics and reporting dashboard",
    progress: 60,
    team: ["Taylor", "Casey", "Alex"],
  },
  {
    id: "auth-service",
    name: "Authentication Service",
    description: "Unified authentication system for all platforms",
    progress: 90,
    team: ["Jordan", "Morgan"],
  },
];

const ProjectsPage = () => {
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
        <Button variant="contained" startIcon={<AddIcon />}>
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2">Progress</Typography>
            <Typography variant="body2" fontWeight="medium">
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Team Members:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.team.join(", ")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/projects/${project.id}`}
          size="small"
          color="primary"
        >
          View Project
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectsPage;
