// components/AppHeader.jsx
import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";

const AppHeader = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          ProjectTracker
        </Typography>
        <Button color="inherit" variant="outlined" sx={{ mr: 2 }}>
          Create
        </Button>
        <Avatar sx={{ bgcolor: "primary.dark" }}>US</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
