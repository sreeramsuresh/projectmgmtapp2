import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import BoardColumns from "./BoardColumns";

/**
 * SimpleKanbanBoard Component
 *
 * This component can be:
 * 1. Accessed directly via the /kanban route
 * 2. Accessed with a project ID via /kanban/:projectId route
 * 3. Embedded in the ProjectDetailPage via props
 */
const SimpleKanbanBoard = ({ projectId: propProjectId }) => {
  // Get projectId from URL params if present, otherwise use prop
  const { projectId: paramProjectId } = useParams();
  const effectiveProjectId = propProjectId || paramProjectId || "";

  const location = useLocation();

  // State for the currently selected project
  const [selectedProject, setSelectedProject] = useState(effectiveProjectId);

  // Sample data - in a real app, you would fetch this from an API
  const projects = [
    { id: "dev-portal", name: "Developer Portal" },
    { id: "mobile-app", name: "Mobile App Redesign" },
    { id: "analytics", name: "Analytics Dashboard" },
    { id: "auth-service", name: "Authentication Service" },
  ];

  // Sample Kanban board data - in a real app, you would fetch this based on selectedProject
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
      projectId: "dev-portal",
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
      projectId: "dev-portal",
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
      projectId: "auth-service",
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
      projectId: "analytics",
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
      projectId: "dev-portal",
    },
    {
      id: 6,
      columnId: 1,
      title: "Design mobile navigation",
      description: "Create wireframes for mobile app navigation",
      priority: "High",
      assignee: "Morgan",
      tags: ["ui", "mobile"],
      dueDate: "2025-03-20",
      projectId: "mobile-app",
    },
    {
      id: 7,
      columnId: 2,
      title: "Implement data visualization components",
      description: "Create charts and graphs for the analytics dashboard",
      priority: "Medium",
      assignee: "Taylor",
      tags: ["frontend", "charts"],
      dueDate: "2025-03-18",
      projectId: "analytics",
    },
  ]);

  // Handle project selection change
  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  // Update selected project when effectiveProjectId changes
  useEffect(() => {
    if (effectiveProjectId) {
      setSelectedProject(effectiveProjectId);
    }
  }, [effectiveProjectId]);

  // Filter tasks based on selected project
  const filteredTasks = selectedProject
    ? tasks.filter((task) => task.projectId === selectedProject)
    : [];

  // Handle moving tasks between columns
  const handleMoveTask = (taskId, newColumnId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );
  };

  // Handle adding a new task
  const handleAddTask = (columnId) => {
    console.log(
      `Add task to column ${columnId} for project ${selectedProject}`
    );
    // In a real app, you would open a dialog to create a new task
  };

  // Determine if we should show the project selector
  // Hide it when embedded in project detail page or when accessed via /kanban/:projectId
  const showProjectSelector = !propProjectId;

  return (
    <Box>
      {!propProjectId && (
        <Typography variant="h4" gutterBottom>
          Kanban Board
        </Typography>
      )}

      {/* Project selection dropdown - only show when not embedded or not pre-selected */}
      {showProjectSelector && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="project-select-label">Select Project</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={selectedProject}
              label="Select Project"
              onChange={handleProjectChange}
            >
              <MenuItem value="">
                <em>Select a project</em>
              </MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      )}

      {/* Display the kanban board only if a project is selected */}
      {selectedProject && filteredTasks.length > 0 ? (
        <BoardColumns
          columns={columns}
          tasks={filteredTasks}
          onMoveTask={handleMoveTask}
          onAddTask={handleAddTask}
        />
      ) : (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            {selectedProject
              ? "No tasks found for this project"
              : "Please select a project to view its Kanban board"}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SimpleKanbanBoard;
