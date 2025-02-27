// src/Pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { SentimentVeryDissatisfied as SadFaceIcon } from "@mui/icons-material";

const NotFoundPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <SadFaceIcon sx={{ fontSize: 100, color: "grey.500", mb: 2 }} />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          size="large"
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
