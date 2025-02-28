// src/Pages/DashboardPage.jsx
import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AddTask as AddTaskIcon,
  ArrowForward as ArrowForwardIcon,
  AssignmentTurnedIn as CompletedIcon,
  CheckCircleOutline as CheckIcon,
  LocalFireDepartment as BurndownIcon,
  MoreVert as MoreIcon,
  Pending as PendingIcon,
  PieChart as PieChartIcon,
  Speed as VelocityIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Dummy data
const projectSummary = [
  {
    id: "dev-portal",
    name: "Developer Portal",
    progress: 75,
    tasks: { total: 24, completed: 18 },
    deadline: "Mar 15, 2025",
    team: ["AJ", "TS", "ML"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Redesign",
    progress: 30,
    tasks: { total: 32, completed: 9 },
    deadline: "Apr 10, 2025",
    team: ["JC", "CK", "ML"],
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    progress: 60,
    tasks: { total: 18, completed: 11 },
    deadline: "Mar 25, 2025",
    team: ["TS", "JC", "AJ"],
  },
  {
    id: "auth-service",
    name: "Authentication Service",
    progress: 90,
    tasks: { total: 15, completed: 13 },
    deadline: "Mar 5, 2025",
    team: ["JC", "CK"],
  },
];

const recentActivities = [
  {
    user: "Alex Johnson",
    avatar: "AJ",
    action: "completed task",
    target: "Update API Documentation",
    time: "10 minutes ago",
    project: "Developer Portal",
  },
  {
    user: "Jordan Chen",
    avatar: "JC",
    action: "moved task",
    target: "Implement SSO Authentication",
    time: "2 hours ago",
    project: "Authentication Service",
  },
  {
    user: "Taylor Smith",
    avatar: "TS",
    action: "commented on",
    target: "Dashboard UI Redesign",
    time: "3 hours ago",
    project: "Analytics Dashboard",
  },
  {
    user: "Morgan Lee",
    avatar: "ML",
    action: "created task",
    target: "Mobile Navigation Prototype",
    time: "Yesterday",
    project: "Mobile App Redesign",
  },
  {
    user: "Casey Kim",
    avatar: "CK",
    action: "assigned task to Taylor",
    target: "Chart Component Testing",
    time: "Yesterday",
    project: "Analytics Dashboard",
  },
];

const upcomingDeadlines = [
  {
    task: "Finalize Authentication Flow",
    project: "Authentication Service",
    dueDate: "Mar 5, 2025",
    priority: "High",
  },
  {
    task: "Complete API Documentation",
    project: "Developer Portal",
    dueDate: "Mar 10, 2025",
    priority: "Medium",
  },
  {
    task: "Dashboard UI Implementation",
    project: "Analytics Dashboard",
    dueDate: "Mar 15, 2025",
    priority: "High",
  },
  {
    task: "Mobile Navigation Testing",
    project: "Mobile App Redesign",
    dueDate: "Mar 18, 2025",
    priority: "Medium",
  },
];

// Colors for priority levels
const priorityColors = {
  High: { bg: "#ffebee", color: "#d32f2f" },
  Medium: { bg: "#fff8e1", color: "#ff8f00" },
  Low: { bg: "#e8f5e9", color: "#2e7d32" },
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            mr: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: color || "grey.100",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="medium">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddTaskIcon />}
            component={Link}
            to="/projects"
          >
            New Project
          </Button>
        </Grid>

        {/* Stats Row */}
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Total Projects"
            value="4"
            icon={<PieChartIcon color="primary" sx={{ fontSize: 40 }} />}
            color="#bbdefb"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Open Tasks"
            value="38"
            icon={<PendingIcon sx={{ fontSize: 40, color: "#ff9800" }} />}
            color="#fff3e0"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Completed Tasks"
            value="51"
            icon={<CompletedIcon sx={{ fontSize: 40, color: "#4caf50" }} />}
            color="#e8f5e9"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Sprint Velocity"
            value="86 pts"
            icon={<VelocityIcon sx={{ fontSize: 40, color: "#9c27b0" }} />}
            color="#f3e5f5"
          />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Current Projects</Typography>
              <Button
                endIcon={<ArrowForwardIcon />}
                size="small"
                component={Link}
                to="/projects"
              >
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Tasks</TableCell>
                    <TableCell>Deadline</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectSummary.map((project) => (
                    <TableRow key={project.id} hover>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {project.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Box sx={{ width: "100%", mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={project.progress}
                              sx={{
                                height: 8,
                                borderRadius: 5,
                                bgcolor: "#e0e0e0",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor:
                                    project.progress < 30
                                      ? "#f44336"
                                      : project.progress < 70
                                      ? "#ff9800"
                                      : "#4caf50",
                                },
                              }}
                            />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              {project.progress}%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {project.tasks.completed}/{project.tasks.total}
                      </TableCell>
                      <TableCell>{project.deadline}</TableCell>
                      <TableCell>
                        <AvatarGroup
                          max={3}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 28,
                              height: 28,
                              fontSize: "0.875rem",
                            },
                          }}
                        >
                          {project.team.map((member, index) => (
                            <Avatar
                              key={index}
                              sx={{ bgcolor: "primary.main" }}
                            >
                              {member}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          component={Link}
                          to={`/projects/${project.id}`}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Recent Activity */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem
                      key={index}
                      divider={index < recentActivities.length - 1}
                      disablePadding
                      sx={{ py: 1 }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 32,
                            height: 32,
                            fontSize: "0.875rem",
                          }}
                        >
                          {activity.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <Box>
                        <Typography variant="body2">
                          <Box component="span" fontWeight="medium">
                            {activity.user}
                          </Box>{" "}
                          {activity.action}{" "}
                          <Box component="span" fontWeight="medium">
                            {activity.target}
                          </Box>
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.project}
                          </Typography>
                        </Stack>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Upcoming Deadlines */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Deadlines
                </Typography>
                <List>
                  {upcomingDeadlines.map((deadline, index) => (
                    <ListItem
                      key={index}
                      disablePadding
                      divider={index < upcomingDeadlines.length - 1}
                      sx={{ py: 1 }}
                    >
                      <ListItemButton>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {deadline.task}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {deadline.project}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              •
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Due: {deadline.dueDate}
                            </Typography>
                          </Stack>
                        </Box>
                        <Chip
                          label={deadline.priority}
                          size="small"
                          sx={{
                            bgcolor: priorityColors[deadline.priority].bg,
                            color: priorityColors[deadline.priority].color,
                            fontSize: "0.75rem",
                            height: 24,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Sprint Burndown */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Sprint Burndown</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Chip
                  icon={<BurndownIcon fontSize="small" />}
                  label="Current Sprint"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton size="small">
                  <MoreIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                height: 240,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Sprint Progress: 15 days left
              </Typography>
              {/* This is a simplified placeholder for a chart */}
              <Box
                sx={{
                  width: "100%",
                  height: 180,
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  px: 2,
                }}
              >
                {/* Ideal burndown line */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 60,
                    left: 32,
                    right: 32,
                    height: 1,
                    bgcolor: "#e0e0e0",
                    borderStyle: "dashed",
                    borderColor: "#9e9e9e",
                    borderWidth: 1,
                    transform: "rotate(-10deg)",
                    transformOrigin: "left top",
                  }}
                />

                {/* Actual progress bars */}
                {[100, 95, 87, 80, 76, 68, 60, 55, 50, 48, 45, 42, 40, 38].map(
                  (height, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 15,
                        height: `${height}%`,
                        bgcolor:
                          index % 2 === 0 ? "primary.main" : "primary.light",
                        mx: 0.5,
                        borderRadius: "2px 2px 0 0",
                        transition: "height 0.3s ease",
                      }}
                    />
                  )
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Team Velocity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Team Velocity</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Chip
                  icon={<TimelineIcon fontSize="small" />}
                  label="Last 6 Sprints"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton size="small">
                  <MoreIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                height: 240,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* This is a simplified placeholder for a chart */}
              <Box
                sx={{
                  width: "100%",
                  height: 180,
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-around",
                  px: 2,
                }}
              >
                {[75, 82, 68, 90, 78, 86].map((height, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 40,
                      height: `${height * 0.9}%`,
                      bgcolor: "secondary.main",
                      borderRadius: "4px 4px 0 0",
                      position: "relative",
                      "&::after": {
                        content: '"Sprint ' + (index + 1) + '"',
                        position: "absolute",
                        bottom: -24,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        fontSize: "0.75rem",
                        color: "text.secondary",
                      },
                      "&::before": {
                        content: `"${height}"`,
                        position: "absolute",
                        top: -20,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        fontSize: "0.75rem",
                        color: "text.primary",
                        fontWeight: "medium",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
