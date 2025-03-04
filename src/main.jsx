// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { initializeMsal } from "./auth/msalService";

// Initialize Microsoft Authentication Library
initializeMsal();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
