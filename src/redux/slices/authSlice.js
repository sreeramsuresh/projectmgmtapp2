// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Microsoft SSO login
export const loginWithMicrosoft = createAsyncThunk(
  "auth/loginWithMicrosoft",
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with MSAL in a separate file
      const userData = await Promise.resolve({ success: true }); // Placeholder
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Regular login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // In a real app, this would make an API call
      // For now, we'll simulate a successful login with mock data
      if (
        credentials.email === "admin@example.com" &&
        credentials.password === "admin123"
      ) {
        return {
          user: {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          },
          token: "mock-jwt-token-for-admin",
        };
      } else if (
        credentials.email === "user@example.com" &&
        credentials.password === "user123"
      ) {
        return {
          user: {
            id: "2",
            name: "Regular User",
            email: "user@example.com",
            role: "user",
          },
          token: "mock-jwt-token-for-user",
        };
      } else if (
        credentials.email === "manager@example.com" &&
        credentials.password === "manager123"
      ) {
        return {
          user: {
            id: "3",
            name: "Project Manager",
            email: "manager@example.com",
            role: "manager",
          },
          token: "mock-jwt-token-for-manager",
        };
      }
      return rejectWithValue("Invalid credentials");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Clear any session/local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Regular login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // Save to localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Microsoft login
      .addCase(loginWithMicrosoft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithMicrosoft.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // Save to localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginWithMicrosoft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
