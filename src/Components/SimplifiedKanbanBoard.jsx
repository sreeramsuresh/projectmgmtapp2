// src/Components/SimplifiedKanbanBoard.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Edit as EditIcon,
  MoreVert as MoreIcon,
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

const TaskList = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  flexGrow: 1,
  minHeight: 200,
  maxHeight: "calc(100vh - 280px)",
  overflowY: "auto",
}));

const TaskItem = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  "&:hover": {
    boxShadow: theme.shadows[2],
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

const SimplifiedKanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    columnId: "",
  });
  const [addingTaskToColumn, setAddingTaskToColumn] = useState(null);

  // Move a task to a different column
  const moveTask = (taskId, targetColumnId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: targetColumnId } : task
      )
    );
  };

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
      id: `task-${tasks.length + 1}`,
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Board header with title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Kanban Board</Typography>
        <Typography variant="body2" color="text.secondary">
          Manage tasks across different status columns
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {column.title}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {getTasksForColumn(column.id).length}
              </Typography>
            </ColumnHeader>

            {/* Tasks */}
            <TaskList>
              {getTasksForColumn(column.id).map((task) => (
                <TaskItem key={task.id} variant="outlined">
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
                  <Divider />
                  <CardActions sx={{ px: 2, py: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        Move to:
                      </Typography>
                      <Select
                        size="small"
                        value=""
                        displayEmpty
                        variant="standard"
                        sx={{
                          fontSize: "0.75rem",
                          "& .MuiSelect-select": {
                            py: 0.5,
                            "&:focus": { backgroundColor: "transparent" },
                          },
                          minWidth: 100,
                        }}
                        onChange={(e) => moveTask(task.id, e.target.value)}
                      >
                        <MenuItem value="" disabled>
                          <em>Move to...</em>
                        </MenuItem>
                        {columns
                          .filter((col) => col.id !== task.columnId)
                          .map((col) => (
                            <MenuItem key={col.id} value={col.id}>
                              {col.title}
                            </MenuItem>
                          ))}
                      </Select>
                    </Box>
                  </CardActions>
                </TaskItem>
              ))}

              {/* Add task input field */}
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

export default SimplifiedKanbanBoard;
