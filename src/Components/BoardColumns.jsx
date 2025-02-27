// components/BoardColumns.jsx
import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import TaskColumn from "./TaskColumn";

const BoardColumns = ({ columns, tasks, onMoveTask, onAddTask }) => {
  return (
    <Box sx={{ display: "flex", overflowX: "auto", pb: 2, flexGrow: 1 }}>
      {columns.map((column) => (
        <TaskColumn
          key={column.id}
          column={column}
          tasks={tasks.filter((task) => task.columnId === column.id)}
          allColumns={columns}
          onMoveTask={onMoveTask}
          onAddTask={() => onAddTask(column.id)}
        />
      ))}

      {/* Add column button */}
      <Paper
        sx={{
          width: 280,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Button startIcon={<AddIcon />}>Add Column</Button>
      </Paper>
    </Box>
  );
};

export default BoardColumns;
