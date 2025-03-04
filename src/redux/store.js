// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import projectReducer from "./slices/projectSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    projects: projectReducer,
  },
});

export default store;
