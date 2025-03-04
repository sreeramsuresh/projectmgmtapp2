// src/components/Notifications/NotificationDemo.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNotification } from "../../contexts/NotificationContext";

// This component is for demonstration purposes - it allows you to trigger different types of notifications
const NotificationDemo = () => {
  const { addNotification, settings } = useNotification();

  const [notificationData, setNotificationData] = useState({
    type: "task_assigned",
    taskName: "Example Task",
    projectName: "Example Project",
    user: "John Doe",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData({
      ...notificationData,
      [name]: value,
    });
  };

  const handleSendNotification = () => {
    addNotification({
      ...notificationData,
      message:
        notificationData.message || getDefaultMessage(notificationData.type),
    });
  };

  const getDefaultMessage = (type) => {
    switch (type) {
      case "task_assigned":
        return `You've been assigned to "${notificationData.taskName}"`;
      case "task_completed":
        return `Task "${notificationData.taskName}" has been completed`;
      case "project_update":
        return `Project "${notificationData.projectName}" has been updated`;
      case "comment":
        return `${notificationData.user} commented on "${notificationData.taskName}"`;
      default:
        return "New notification";
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notification Test Panel
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Use this panel to send test notifications and see how they appear.
          {!settings.emailNotifications && (
            <Box component="span" fontWeight="medium" color="warning.main">
              {" "}
              Email notifications are currently disabled.
            </Box>
          )}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="notification-type-label">Type</InputLabel>
              <Select
                labelId="notification-type-label"
                id="notification-type"
                name="type"
                value={notificationData.type}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="task_assigned">Task Assigned</MenuItem>
                <MenuItem value="task_completed">Task Completed</MenuItem>
                <MenuItem value="project_update">Project Update</MenuItem>
                <MenuItem value="comment">New Comment</MenuItem>
                <MenuItem value="custom">Custom Message</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {(notificationData.type === "task_assigned" ||
            notificationData.type === "task_completed" ||
            notificationData.type === "comment") && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Task Name"
                name="taskName"
                value={notificationData.taskName}
                onChange={handleChange}
              />
            </Grid>
          )}

          {notificationData.type === "project_update" && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={notificationData.projectName}
                onChange={handleChange}
              />
            </Grid>
          )}

          {notificationData.type === "comment" && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="User"
                name="user"
                value={notificationData.user}
                onChange={handleChange}
              />
            </Grid>
          )}

          {notificationData.type === "custom" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Custom Message"
                name="message"
                value={notificationData.message}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSendNotification}
                disabled={
                  notificationData.type === "custom" &&
                  !notificationData.message
                }
              >
                Send Test Notification
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NotificationDemo;
