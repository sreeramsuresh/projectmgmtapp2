// src/components/Notifications/NotificationSettings.jsx
import React from "react";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useNotification } from "../../contexts/NotificationContext";

const NotificationSettings = () => {
  const { settings, updateSettings } = useNotification();

  const handleToggle = (event) => {
    updateSettings({ [event.target.name]: event.target.checked });
  };

  const handleChange = (event) => {
    updateSettings({ [event.target.name]: event.target.value });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notification Settings
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Configure how and when you receive notifications
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Notification Channels
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.emailNotifications}
                onChange={handleToggle}
                name="emailNotifications"
              />
            }
            label="Email Notifications"
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 4, mt: -1, mb: 1 }}
          >
            Receive notifications via email
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.pushNotifications}
                onChange={handleToggle}
                name="pushNotifications"
              />
            }
            label="Push Notifications"
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 4, mt: -1, mb: 1 }}
          >
            Receive notifications in your browser
          </Typography>
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Notification Preferences
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.taskAssigned}
                onChange={handleToggle}
                name="taskAssigned"
                disabled={
                  !settings.emailNotifications && !settings.pushNotifications
                }
              />
            }
            label="Task Assigned"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.taskCompleted}
                onChange={handleToggle}
                name="taskCompleted"
                disabled={
                  !settings.emailNotifications && !settings.pushNotifications
                }
              />
            }
            label="Task Completed"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.projectUpdates}
                onChange={handleToggle}
                name="projectUpdates"
                disabled={
                  !settings.emailNotifications && !settings.pushNotifications
                }
              />
            }
            label="Project Updates"
          />
        </FormGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="reminder-frequency-label">
            Reminder Frequency
          </InputLabel>
          <Select
            labelId="reminder-frequency-label"
            id="reminder-frequency"
            value={settings.reminderFrequency}
            label="Reminder Frequency"
            name="reminderFrequency"
            onChange={handleChange}
            disabled={!settings.emailNotifications}
          >
            <MenuItem value="never">Never</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          How often you would like to receive email reminders for outstanding
          tasks
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationSettings;
