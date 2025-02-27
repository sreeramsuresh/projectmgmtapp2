// src/Pages/SettingsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="settings tabs"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<AccountIcon />} label="Account" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<PaletteIcon />} label="Appearance" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <AccountSettings />}
          {activeTab === 1 && <SecuritySettings />}
          {activeTab === 2 && <NotificationSettings />}
          {activeTab === 3 && <AppearanceSettings />}
        </Box>
      </Card>
    </Box>
  );
};

const AccountSettings = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            defaultValue="Alex Johnson"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            defaultValue="alex@example.com"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Title"
            variant="outlined"
            defaultValue="Project Manager"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Department"
            variant="outlined"
            defaultValue="Product Development"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            defaultValue="Experienced project manager with a focus on agile methodologies."
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Save Changes</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const SecuritySettings = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Update Password</Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Two-Factor Authentication
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Enable two-factor authentication"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined">Set Up 2FA</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const NotificationSettings = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Email Notifications
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Task assignments"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Task status changes"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Comments on your tasks"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Project updates"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        In-App Notifications
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Task assignments"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Comments and mentions"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Due date reminders"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const AppearanceSettings = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Theme
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Dark Mode"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Layout
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Compact View"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Language
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Language"
            value="english"
            SelectProps={{
              native: true,
            }}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="japanese">Japanese</option>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
