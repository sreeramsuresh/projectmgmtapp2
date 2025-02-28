// src/Router/Layout.jsx - Updated with Kanban navigation
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ViewKanban as KanbanIcon,
  Assignment as ProjectsIcon,
  People as TeamIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Constants
const drawerWidth = 240;

// Styled components
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// Navigation items
const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Projects", icon: <ProjectsIcon />, path: "/projects" },
  { text: "Kanban Board", icon: <KanbanIcon />, path: "/kanban" },
  { text: "Team", icon: <TeamIcon />, path: "/team" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // Toggle drawer open/closed
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Handle user menu
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* App Bar */}
      <StyledAppBar position="absolute" open={open}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            ProjectTracker
          </Typography>

          {/* Search button */}
          <Tooltip title="Search">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          {/* User menu */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleUserMenuOpen}
              size="small"
              edge="end"
              aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.dark" }}>
                US
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>My Profile</MenuItem>
            <MenuItem>Account Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>

      {/* Sidebar / Drawer */}
      <StyledDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        {/* Navigation items */}
        <List component="nav">
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname.startsWith(item.path)}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "grey.800",
                    "&:hover": {
                      backgroundColor: "grey.700",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "grey.800",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& .MuiTypography-root": {
                      fontWeight: location.pathname.startsWith(item.path)
                        ? "medium"
                        : "regular",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar /> {/* Spacer to push content below app bar */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {/* Render the current route's component */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
