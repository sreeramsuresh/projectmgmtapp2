import React from "react";
import { useParams, useLocation } from "react-router-dom";
import SimpleKanbanBoard from "../Components/SimpleKanbanBoard";
import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";
import {
  ViewKanban as KanbanIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";

// Mock project data based on ID - in a real app, this would come from an API
const getProjectDetails = (projectId) => {
  const projects = {
    "dev-portal": {
      name: "Developer Portal",
      description:
        "A centralized platform for API documentation and developer resources",
      progress: 75,
    },
    "mobile-app": {
      name: "Mobile App Redesign",
      description: "Complete UI/UX overhaul of the mobile application",
      progress: 30,
    },
    analytics: {
      name: "Analytics Dashboard",
      description: "Data visualization tools for business insights",
      progress: 60,
    },
    "auth-service": {
      name: "Authentication Service",
      description:
        "Secure authentication system with JWT and OAuth integration",
      progress: 90,
    },
  };

  return (
    projects[projectId] || {
      name: projectId,
      description: "Project details not found",
      progress: 0,
    }
  );
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const location = useLocation();
  // Check if there's an initialTab value in the location state
  const initialTabValue = location.state?.initialTab || 0;
  const [tabValue, setTabValue] = React.useState(initialTabValue);
  const projectDetails = getProjectDetails(projectId);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {projectDetails.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {projectDetails.description}
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="project detail tabs"
        >
          <Tab icon={<InfoIcon />} label="Overview" />
          <Tab icon={<KanbanIcon />} label="Kanban Board" />
          <Tab icon={<TimelineIcon />} label="Timeline" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Project Overview
            </Typography>
            <Typography variant="body1">
              This section would show project overview information, progress
              charts, key metrics, and other important details.
            </Typography>
            {/* Additional project overview information would go here */}
          </Paper>
        )}

        {tabValue === 1 && (
          <Box sx={{ height: "calc(100vh - 280px)" }}>
            {/* Pass the project ID to SimpleKanbanBoard */}
            <SimpleKanbanBoard projectId={projectId} />
          </Box>
        )}

        {tabValue === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Project Timeline
            </Typography>
            <Typography variant="body1">
              Project timeline, milestones, and deadlines would be displayed
              here.
            </Typography>
            {/* Timeline visualization would go here */}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ProjectDetailPage;
