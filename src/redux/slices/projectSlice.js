// src/redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Sample project data
const projectsData = [
  {
    id: "dev-portal",
    name: "Developer Portal",
    description:
      "A centralized platform for API documentation and developer resources",
    progress: 75,
    tasks: { total: 24, completed: 18 },
    deadline: "Mar 15, 2025",
    team: ["AJ", "TS", "ML"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Redesign",
    description: "Complete UI/UX overhaul of the mobile application",
    progress: 30,
    tasks: { total: 32, completed: 9 },
    deadline: "Apr 10, 2025",
    team: ["JC", "CK", "ML"],
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Data visualization tools for business insights",
    progress: 60,
    tasks: { total: 18, completed: 11 },
    deadline: "Mar 25, 2025",
    team: ["TS", "JC", "AJ"],
  },
  {
    id: "auth-service",
    name: "Authentication Service",
    description: "Secure authentication system with JWT and OAuth integration",
    progress: 90,
    tasks: { total: 15, completed: 13 },
    deadline: "Mar 5, 2025",
    team: ["JC", "CK"],
  },
];

// Fetch all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.token) {
        throw new Error("Not authenticated");
      }

      // In a real app, this would be an API call
      // For now, just return the mock data
      return projectsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch a single project by ID
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.token) {
        throw new Error("Not authenticated");
      }

      // In a real app, this would be an API call
      const project = projectsData.find((p) => p.id === projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      return project;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.token) {
        throw new Error("Not authenticated");
      }

      // In a real app, this would be an API call
      // For now, just return the new project with an ID
      const newProject = {
        id: `project-${Date.now()}`,
        ...projectData,
      };

      return newProject;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update a project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, projectData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.token) {
        throw new Error("Not authenticated");
      }

      // In a real app, this would be an API call
      const project = projectsData.find((p) => p.id === projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      return { ...project, ...projectData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (
          state.currentProject &&
          state.currentProject.id === action.payload.id
        ) {
          state.currentProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectError } = projectSlice.actions;

export default projectSlice.reducer;
