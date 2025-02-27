// components/TaskCard.jsx
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  "&:hover": {
    boxShadow: theme.shadows[3],
  },
}));

const PriorityChip = styled(Chip)(({ theme, priority }) => {
  const getColor = () => {
    switch (priority) {
      case "High":
        return {
          bg: theme.palette.error.light,
          color: theme.palette.error.dark,
        };
      case "Medium":
        return {
          bg: theme.palette.warning.light,
          color: theme.palette.warning.dark,
        };
      case "Low":
        return {
          bg: theme.palette.success.light,
          color: theme.palette.success.dark,
        };
      default:
        return { bg: theme.palette.grey[100], color: theme.palette.grey[800] };
    }
  };

  const { bg, color } = getColor();

  return {
    backgroundColor: bg,
    color: color,
    fontSize: "0.75rem",
    height: 24,
  };
});

const TaskCard = ({ task, availableColumns, onMoveTask }) => {
  return (
    <StyledCard variant="outlined">
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle2" fontWeight="medium">
            {task.title}
          </Typography>
          <IconButton size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {task.description}
        </Typography>

        <TaskCardDetails task={task} />

        {/* Move options */}
        <TaskMoveOptions
          availableColumns={availableColumns}
          taskId={task.id}
          onMoveTask={onMoveTask}
        />
      </CardContent>
    </StyledCard>
  );
};

export default TaskCard;
