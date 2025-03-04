// src/components/Notifications/NotificationBell.jsx
import React, { useState } from "react";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  MarkEmailRead as MarkReadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNotification } from "../../contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotification();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const handleRemove = (id) => {
    removeNotification(id);
  };

  // Format the notification message based on type
  const getNotificationContent = (notification) => {
    switch (notification.type) {
      case "task_assigned":
        return `You've been assigned to "${notification.taskName}"`;
      case "task_completed":
        return `Task "${notification.taskName}" has been marked as complete`;
      case "project_update":
        return `Project "${notification.projectName}" has been updated`;
      case "comment":
        return `${notification.user} commented on "${notification.taskName}"`;
      default:
        return notification.message || "New notification";
    }
  };

  // Format the time to a human-readable format (e.g., "2 hours ago")
  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-controls={open ? "notifications-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 500,
            boxShadow: 3,
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <Tooltip title="Mark all as read">
              <IconButton
                size="small"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <MarkReadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear all">
              <IconButton
                size="small"
                onClick={clearAllNotifications}
                disabled={notifications.length === 0}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                alignItems="flex-start"
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: notification.read ? "inherit" : "action.hover",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => handleRemove(notification.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: notification.read ? "regular" : "medium",
                        mr: 4, // Space for the delete button
                      }}
                    >
                      {getNotificationContent(notification)}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(notification.timestamp)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;
