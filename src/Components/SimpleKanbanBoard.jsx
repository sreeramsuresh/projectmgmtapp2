// src/Components/SimpleKanbanBoard.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const ColumnContainer = styled(Paper)(({ theme }) => ({
  width: 280,
  minWidth: 280,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  margin: theme.spacing(0, 2, 0, 0),
  borderRadius: theme.shape.borderRadius,
}));

const ColumnHeader = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: color || theme.palette.grey[100],
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

// Create a proper styled component that doesn't pass isOver to DOM
const TaskList = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isOver",
})(({ theme, isOver }) => ({
  padding: theme.spacing(1),
  flexGrow: 1,
  minHeight: 200,
  maxHeight: "calc(100vh - 280px)",
  overflowY: "auto",
  backgroundColor: isOver ? theme.palette.action.hover : "transparent",
  transition: "background-color 0.2s ease",
}));

// Create a proper styled component that doesn't pass isDragging to DOM
const TaskItem = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isDragging",
})(({ theme, isDragging }) => ({
  marginBottom: theme.spacing(1),
  cursor: "grab",
  opacity: isDragging ? 0.5 : 1,
  boxShadow: theme.shadows[1],
  "&:hover": {
    boxShadow: theme.shadows[2],
  },
}));

// Create a proper styled component that doesn't pass priority to DOM
const PriorityChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "priority",
})(({ theme, priority }) => {
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

// Initial data
const initialColumns = [
  { id: "column-1", title: "To Do", color: "#e5e7eb" },
  { id: "column-2", title: "In Progress", color: "#bfdbfe" },
  { id: "column-3", title: "Review", color: "#fef3c7" },
  { id: "column-4", title: "Done", color: "#bbf7d0" },
];

const initialTasks = [
  {
    id: "task-1",
    columnId: "column-1",
    title: "Set up project structure",
    description: "Create the initial folder structure and configure webpack",
    priority: "High",
    assignee: "Alex",
    dueDate: "2025-03-10",
    tags: ["setup", "frontend"],
  },
  {
    id: "task-2",
    columnId: "column-1",
    title: "Design database schema",
    description: "Create ERD and define relationships between entities",
    priority: "Medium",
    assignee: "Jordan",
    dueDate: "2025-03-15",
    tags: ["database", "planning"],
  },
  {
    id: "task-3",
    columnId: "column-2",
    title: "Implement user authentication",
    description: "Create login, registration and password recovery flows",
    priority: "High",
    assignee: "Taylor",
    dueDate: "2025-03-05",
    tags: ["security", "backend"],
  },
  {
    id: "task-4",
    columnId: "column-3",
    title: "Create dashboard UI",
    description: "Design and implement the main dashboard interface",
    priority: "Medium",
    assignee: "Morgan",
    dueDate: "2025-03-12",
    tags: ["ui", "frontend"],
  },
  {
    id: "task-5",
    columnId: "column-4",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for continuous integration",
    priority: "Low",
    assignee: "Casey",
    dueDate: "2025-02-28",
    tags: ["devops", "automation"],
  },
  {
    id: "task-6",
    columnId: "column-2",
    title: "Implement search functionality",
    description: "Add search feature with filters and sorting options",
    priority: "Medium",
    assignee: "Alex",
    dueDate: "2025-03-18",
    tags: ["feature", "backend"],
  },
  {
    id: "task-7",
    columnId: "column-1",
    title: "Create user profile page",
    description: "Design and implement user settings and profile views",
    priority: "Low",
    assignee: "Morgan",
    dueDate: "2025-03-25",
    tags: ["ui", "frontend"],
  },
];

const SimpleKanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    columnId: "",
  });
  const [addingTaskToColumn, setAddingTaskToColumn] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  // Add a new column
  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newColumn = {
      id: `column-${columns.length + 1}`,
      title: newColumnTitle,
      color: "#e0e0e0", // Default color
    };

    setColumns([...columns, newColumn]);
    setNewColumnTitle("");
    setIsAddingColumn(false);
  };

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title.trim() || !addingTaskToColumn) return;

    const newTaskItem = {
      id: `task-${Date.now()}`, // Using timestamp for unique ID
      columnId: addingTaskToColumn,
      title: newTask.title,
      description: "New task description...",
      priority: "Medium",
      assignee: "",
      dueDate: "",
      tags: [],
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask({ title: "", columnId: "" });
    setAddingTaskToColumn(null);
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Get tasks for a specific column
  const getTasksForColumn = (columnId) => {
    return tasks.filter((task) => task.columnId === columnId);
  };

  // Drag start handler
  const handleDragStart = (e, taskId) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = "move";
    // Required for Firefox
    e.dataTransfer.setData("text/plain", taskId);
  };

  // Drag over handler
  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  // Drag leave handler
  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  // Drop handler
  const handleDrop = (e, columnId) => {
    e.preventDefault();

    if (draggedTask) {
      // Update the task's column
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask ? { ...task, columnId: columnId } : task
        )
      );

      setDraggedTask(null);
      setDragOverColumn(null);
    }
  };

  // Drag end handler
  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Board header with title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Kanban Board</Typography>
        <Typography variant="body2" color="text.secondary">
          Drag and drop tasks between columns to update their status
        </Typography>
      </Box>

      {/* Columns container - horizontally scrollable */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          pb: 2,
          height: "calc(100vh - 220px)",
        }}
      >
        {columns.map((column) => (
          <ColumnContainer key={column.id} elevation={1}>
            {/* Column header */}
            <ColumnHeader color={column.color}>
              <Typography variant="subtitle1" fontWeight="medium">
                {column.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getTasksForColumn(column.id).length}
              </Typography>
            </ColumnHeader>

            {/* Tasks */}
            <TaskList
              isOver={dragOverColumn === column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {getTasksForColumn(column.id).map((task) => (
                <TaskItem
                  key={task.id}
                  isDragging={draggedTask === task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="medium">
                        {task.title}
                      </Typography>
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton size="small" sx={{ p: 0.5 }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            sx={{ p: 0.5 }}
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
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

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <PriorityChip
                        label={task.priority}
                        priority={task.priority}
                        size="small"
                      />

                      <Stack direction="row" spacing={1} alignItems="center">
                        {task.assignee && (
                          <Tooltip title="Assignee">
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <PersonIcon fontSize="small" color="action" />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {task.assignee}
                              </Typography>
                            </Stack>
                          </Tooltip>
                        )}

                        {task.dueDate && (
                          <Tooltip title="Due Date">
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <CalendarIcon fontSize="small" color="action" />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {task.dueDate}
                              </Typography>
                            </Stack>
                          </Tooltip>
                        )}
                      </Stack>
                    </Box>

                    {task.tags && task.tags.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mt: 1,
                        }}
                      >
                        {task.tags.map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag}
                            size="small"
                            sx={{ height: 20, fontSize: "0.75rem" }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </TaskItem>
              ))}

              {/* Add task button/form */}
              {addingTaskToColumn === column.id ? (
                <Card variant="outlined" sx={{ mt: 1 }}>
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <TextField
                      autoFocus
                      fullWidth
                      placeholder="Enter task title..."
                      variant="outlined"
                      size="small"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      sx={{ mb: 1 }}
                    />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handleAddTask}
                      >
                        Add
                      </Button>
                      <Button
                        size="small"
                        onClick={() => setAddingTaskToColumn(null)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => setAddingTaskToColumn(column.id)}
                  sx={{ mt: 1 }}
                >
                  Add a task
                </Button>
              )}
            </TaskList>
          </ColumnContainer>
        ))}

        {/* Add column button or input */}
        <Paper
          sx={{
            width: 280,
            minWidth: 280,
            height: isAddingColumn ? "auto" : 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: isAddingColumn ? "flex-start" : "center",
            p: isAddingColumn ? 2 : 0,
          }}
        >
          {isAddingColumn ? (
            <>
              <TextField
                autoFocus
                fullWidth
                placeholder="Enter column title..."
                variant="outlined"
                size="small"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddColumn}
                >
                  Add Column
                </Button>
                <Button size="small" onClick={() => setIsAddingColumn(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Button
              startIcon={<AddIcon />}
              onClick={() => setIsAddingColumn(true)}
            >
              Add Column
            </Button>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default SimpleKanbanBoard;
