// components/TaskColumn.jsx
import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import TaskCard from "./TaskCard";

const ColumnContainer = styled(Paper)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  height: "fit-content",
  maxHeight: "100%",
  display: "flex",
  flexDirection: "column",
  marginRight: theme.spacing(2),
  overflow: "hidden",
}));

const ColumnHeader = styled("div")(({ theme, color }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: color || theme.palette.grey[200],
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const TaskColumn = ({ column, tasks, allColumns, onMoveTask, onAddTask }) => {
  return (
    <ColumnContainer elevation={1}>
      <ColumnHeader color={column.color}>
        <Typography variant="subtitle1" fontWeight="medium">
          {column.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {tasks.length}
        </Typography>
      </ColumnHeader>

      <Box sx={{ p: 1.5, overflowY: "auto", flexGrow: 1 }}>
        {/* Tasks */}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            availableColumns={allColumns.filter(
              (col) => col.id !== task.columnId
            )}
            onMoveTask={onMoveTask}
          />
        ))}

        {/* Add task button */}
        <Button
          variant="text"
          startIcon={<AddIcon />}
          fullWidth
          onClick={onAddTask}
          sx={{ mt: 1 }}
        >
          Add a task
        </Button>
      </Box>
    </ColumnContainer>
  );
};

export default TaskColumn;
