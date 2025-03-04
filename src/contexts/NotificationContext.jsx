// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

// Provider component
export const NotificationProvider = ({ children }) => {
  // State for notifications
  const [notifications, setNotifications] = useState([]);

  // State for notification settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskAssigned: true,
    taskCompleted: true,
    projectUpdates: true,
    reminderFrequency: "daily",
  });

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(), // Simple unique ID
      read: false,
      timestamp: new Date(),
      ...notification,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // If email notifications are enabled, would send email here
    if (settings.emailNotifications && shouldSendEmail(notification)) {
      sendEmailNotification(notification);
    }
  };

  // Determine if an email should be sent based on notification type and settings
  const shouldSendEmail = (notification) => {
    switch (notification.type) {
      case "task_assigned":
        return settings.taskAssigned;
      case "task_completed":
        return settings.taskCompleted;
      case "project_update":
        return settings.projectUpdates;
      default:
        return true;
    }
  };

  // Mock function to simulate sending email
  const sendEmailNotification = (notification) => {
    console.log("📧 Sending email notification:", notification);
    // In a real application, you would call an API here
  };

  // Mark a notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Remove a notification
  const removeNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Update notification settings
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));

    // In a real app, you would save these settings to a server
    console.log("Updated notification settings:", {
      ...settings,
      ...newSettings,
    });
  };

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Value to be provided to consumers
  const value = {
    notifications,
    unreadCount,
    settings,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    updateSettings,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
