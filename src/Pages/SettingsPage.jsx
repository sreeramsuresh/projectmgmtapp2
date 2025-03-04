// src/Pages/SettingsPage.jsx - Updated version with notification settings
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
import { useNotification } from "../contexts/NotificationContext";
import NotificationSettings from "../components/Notifications/NotificationSettings";
import NotificationDemo from "../components/Notifications/NotificationDemo";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "Settings saved successfully",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Sections configuration
  const sections = [
    { id: "account", label: "Account", icon: <AccountIcon /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <NotificationsIcon />,
    },
    { id: "security", label: "Security", icon: <SecurityIcon /> },
    { id: "appearance", label: "Appearance", icon: <PaletteIcon /> },
    { id: "language", label: "Language", icon: <LanguageIcon /> },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Settings navigation */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ mb: { xs: 2, md: 0 } }}>
            <List component="nav">
              {sections.map((section) => (
                <ListItem
                  button
                  key={section.id}
                  selected={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    },
                  }}
                >
                  <ListItemIcon>{section.icon}</ListItemIcon>
                  <ListItemText primary={section.label} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Settings content */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            {/* Account Settings */}
            {activeSection === "account" && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { mb: 2 } }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    defaultValue="User Name"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue="user@example.com"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Job Title"
                    defaultValue="Project Manager"
                    margin="normal"
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <Box>
                <NotificationSettings />
                <Box sx={{ mt: 4 }}>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Testing
                  </Typography>
                  <NotificationDemo />
                </Box>
              </Box>
            )}

            {/* Security Settings */}
            {activeSection === "security" && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>

                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { mb: 2 } }}
                >
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    margin="normal"
                  />

                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Update Password
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Appearance Settings */}
            {activeSection === "appearance" && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Appearance Settings
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="theme-select-label">Theme</InputLabel>
                    <Select
                      labelId="theme-select-label"
                      id="theme-select"
                      value={theme}
                      label="Theme"
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System Default</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Language Settings */}
            {activeSection === "language" && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Language Settings
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="language-select-label">Language</InputLabel>
                    <Select
                      labelId="language-select-label"
                      id="language-select"
                      value={language}
                      label="Language"
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="zh">Chinese</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
