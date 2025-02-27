// components/Sidebar.jsx
import React from "react";
import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import BoardList from "./BoardList";

const drawerWidth = 240;

const Sidebar = ({ boards, currentBoard, setCurrentBoard }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "grey.900",
          color: "white",
        },
      }}
    >
      <Toolbar /> {/* Spacer to push content below app bar */}
      <Box sx={{ overflow: "auto", p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Boards
        </Typography>
        <BoardList
          boards={boards}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
        />

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Filters
        </Typography>
        <SidebarFilters />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
