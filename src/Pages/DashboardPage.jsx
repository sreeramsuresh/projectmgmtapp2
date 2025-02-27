import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 240 }}>
            <Typography variant="h6">Project Progress</Typography>
            {/* Dashboard charts would go here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 240 }}>
            <Typography variant="h6">Recent Activity</Typography>
            {/* Activity feed would go here */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Current Projects</Typography>
            {/* Projects summary would go here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
