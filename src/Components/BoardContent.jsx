// components/BoardContent.jsx
import React from "react";
import { Box, Toolbar } from "@mui/material";
import BoardHeader from "./BoardHeader";
import BoardColumns from "./BoardColumns";

const BoardContent = ({
  currentBoard,
  boards,
  columns,
  tasks,
  onMoveTask,
  onAddTask,
}) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar /> {/* Spacer */}
      {/* Board header */}
      <BoardHeader
        boardName={boards.find((b) => b.id === currentBoard)?.name}
        onAddTask={() => onAddTask(columns[0]?.id || 1)}
      />
      {/* Board columns */}
      <BoardColumns
        columns={columns}
        tasks={tasks}
        onMoveTask={onMoveTask}
        onAddTask={onAddTask}
      />
    </Box>
  );
};

export default BoardContent;
