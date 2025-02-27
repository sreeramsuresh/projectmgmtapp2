// components/TaskMoveOptions.jsx
import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";

const TaskMoveOptions = ({ availableColumns, taskId, onMoveTask }) => {
  return (
    <>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Move to:
        </Typography>
        <Box>
          {availableColumns.map((col) => (
            <Button
              key={col.id}
              size="small"
              sx={{ minWidth: "auto", mr: 0.5 }}
              onClick={() => onMoveTask(taskId, col.id)}
            >
              <Typography variant="caption">{col.name}</Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TaskMoveOptions;
