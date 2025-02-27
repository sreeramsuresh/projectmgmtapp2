import React from "react";
import { useParams } from "react-router-dom";
import ProjectTracker from "./ProjectTracker";
import { Box, Typography } from "@mui/material";

const ProjectDetailPage = () => {
  const { projectId } = useParams();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Project: {projectId}
      </Typography>
      {/* Your ProjectTracker component would be integrated here */}
      <ProjectTracker />
    </Box>
  );
};

export default ProjectDetailPage;
