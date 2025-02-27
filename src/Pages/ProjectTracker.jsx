// ProjectTracker.jsx - Main App Component
import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import AppHeader from "./../Components/AppHeader";
import Sidebar from "./../Components/Sidebar";
import BoardContent from "./../Components/BoardContent";
import TaskFormDialog from "./../Components/TaskFormDialog";

const ProjectTracker = () => {
  // Sample data
  const [boards, setBoards] = useState([
    { id: 1, name: "Development Tasks" },
    { id: 2, name: "Design Tasks" },
    { id: 3, name: "Marketing Tasks" },
  ]);

  const [currentBoard, setCurrentBoard] = useState(1);

  const [columns, setColumns] = useState([
    { id: 1, boardId: 1, name: "To Do", color: "#e5e7eb" },
    { id: 2, boardId: 1, name: "In Progress", color: "#bfdbfe" },
    { id: 3, boardId: 1, name: "Review", color: "#fef3c7" },
    { id: 4, boardId: 1, name: "Done", color: "#bbf7d0" },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      columnId: 1,
      title: "Set up project structure",
      description: "Create the initial folder structure and configure webpack",
      priority: "High",
      assignee: "Alex",
      tags: ["setup", "frontend"],
      dueDate: "2025-03-10",
    },
    {
      id: 2,
      columnId: 1,
      title: "Design database schema",
      description: "Create ERD and define relationships between entities",
      priority: "Medium",
      assignee: "Jordan",
      tags: ["database", "planning"],
      dueDate: "2025-03-15",
    },
    {
      id: 3,
      columnId: 2,
      title: "Implement user authentication",
      description: "Create login, registration and password recovery flows",
      priority: "High",
      assignee: "Taylor",
      tags: ["security", "backend"],
      dueDate: "2025-03-05",
    },
    {
      id: 4,
      columnId: 3,
      title: "Create dashboard UI",
      description: "Design and implement the main dashboard interface",
      priority: "Medium",
      assignee: "Morgan",
      tags: ["ui", "frontend"],
      dueDate: "2025-03-12",
    },
    {
      id: 5,
      columnId: 4,
      title: "Set up CI/CD pipeline",
      description: "Configure GitHub Actions for continuous integration",
      priority: "Low",
      assignee: "Casey",
      tags: ["devops", "automation"],
      dueDate: "2025-02-28",
    },
  ]);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
    tags: "",
    dueDate: "",
    columnId: 1,
  });

  const handleAddTask = () => {
    if (newTask.title.trim() === "") return;

    const task = {
      ...newTask,
      id: tasks.length + 1,
      tags: newTask.tags
        ? newTask.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      assignee: "",
      tags: "",
      dueDate: "",
      columnId: 1,
    });
    setShowNewTaskForm(false);
  };

  const handleMoveTask = (taskId, newColumnId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );
  };

  const openNewTaskForm = (columnId) => {
    setNewTask({ ...newTask, columnId: columnId });
    setShowNewTaskForm(true);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* App Header */}
      <AppHeader />

      {/* Sidebar */}
      <Sidebar
        boards={boards}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />

      {/* Main Board Content */}
      <BoardContent
        currentBoard={currentBoard}
        boards={boards}
        columns={columns.filter((column) => column.boardId === currentBoard)}
        tasks={tasks}
        onMoveTask={handleMoveTask}
        onAddTask={openNewTaskForm}
      />

      {/* Task Creation Dialog */}
      <TaskFormDialog
        open={showNewTaskForm}
        onClose={() => setShowNewTaskForm(false)}
        newTask={newTask}
        setNewTask={setNewTask}
        onAddTask={handleAddTask}
      />
    </Box>
  );
};

export default ProjectTracker;
