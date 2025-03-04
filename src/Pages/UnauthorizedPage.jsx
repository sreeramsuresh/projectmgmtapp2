// src/Pages/UnauthorizedPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { LockOutlined as LockIcon } from "@mui/icons-material";

const UnauthorizedPage = () => {
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
        <LockIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="h6" gutterBottom>
          You don't have permission to access this page
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Please contact your administrator if you believe this is an error.
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

export default UnauthorizedPage;
