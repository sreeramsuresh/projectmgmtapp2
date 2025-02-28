// src/Pages/KanbanPage.jsx
import React from "react";
import { Box, Paper } from "@mui/material";
import SimpleKanbanBoard from "../Components/SimpleKanbanBoard";

const KanbanPage = () => {
  return (
    <Box sx={{ height: "calc(100vh - 100px)" }}>
      <Paper
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <SimpleKanbanBoard />
      </Paper>
    </Box>
  );
};

export default KanbanPage;
