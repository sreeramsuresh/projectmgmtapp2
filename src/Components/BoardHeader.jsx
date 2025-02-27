// components/BoardHeader.jsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon, FilterAlt as FilterAltIcon } from "@mui/icons-react";

const BoardHeader = ({ boardName, onAddTask }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4" component="h1">
        {boardName}
      </Typography>
      <Box>
        <Button variant="outlined" startIcon={<FilterAltIcon />} sx={{ mr: 1 }}>
          Filter
        </Button>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAddTask}>
          Add Task
        </Button>
      </Box>
    </Box>
  );
};

export default BoardHeader;
