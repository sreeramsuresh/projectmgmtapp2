// src/Pages/DashboardPage.jsx - Updated with role-based content
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
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
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Assignment as TaskIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CompletedIcon,
  Schedule as DeadlineIcon,
  Group as TeamIcon,
  Add as AddIcon,
  Business as BusinessIcon,
  BarChart as ChartIcon,
  ArrowUpward as TrendUpIcon,
  NotificationsActive as AlertIcon,
} from "@mui/icons-material";
import { fetchProjects } from "../redux/slices/projectSlice";

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

// Activity Item Component
const ActivityItem = ({ activity, divider }) => {
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start" sx={{ py: 1 }}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor:
                activity.avatar === "AJ"
                  ? "#3f51b5"
                  : activity.avatar === "TS"
                  ? "#f44336"
                  : activity.avatar === "ML"
                  ? "#4caf50"
                  : activity.avatar === "JC"
                  ? "#ff9800"
                  : "#9c27b0",
            }}
          >
            {activity.avatar}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span" variant="body2">
              <Typography component="span" fontWeight="medium">
                {activity.user}
              </Typography>{" "}
              {activity.action}{" "}
              <Typography component="span" fontWeight="medium">
                {activity.target}
              </Typography>
              {activity.project && (
                <Typography component="span" color="text.secondary">
                  {" "}
                  in {activity.project}
                </Typography>
              )}
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="text.secondary">
              {activity.time}
            </Typography>
          }
        />
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}
    </React.Fragment>
  );
};

// Welcome Message Component
const WelcomeMessage = ({ user }) => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {getTimeBasedGreeting()}, {user?.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to your project management dashboard
      </Typography>
    </Box>
  );
};

// Recent Activity Component
const RecentActivity = () => {
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

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <List>
        {recentActivities.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={activity}
            divider={index < recentActivities.length - 1}
          />
        ))}
      </List>
    </Paper>
  );
};

// Upcoming Deadlines Component
const UpcomingDeadlines = () => {
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

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Upcoming Deadlines
      </Typography>
      <List>
        {upcomingDeadlines.map((deadline, index) => (
          <ListItem key={index} sx={{ py: 1 }}>
            <ListItemText
              primary={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" fontWeight="medium">
                    {deadline.task}
                  </Typography>
                  <Chip
                    size="small"
                    label={deadline.priority}
                    sx={{
                      bgcolor: priorityColors[deadline.priority].bg,
                      color: priorityColors[deadline.priority].color,
                      fontWeight: 500,
                      height: 24,
                    }}
                  />
                </Stack>
              }
              secondary={
                <Stack direction="row" spacing={1} mt={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    {deadline.project}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    •
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        new Date(deadline.dueDate) < new Date()
                          ? "error.main"
                          : "text.secondary",
                    }}
                  >
                    Due: {deadline.dueDate}
                  </Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ projects }) => {
  return (
    <>
      {/* Admin Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Projects"
            value={projects.length}
            icon={<TaskIcon />}
            color="#e3f2fd"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Active Users"
            value="12"
            icon={<TeamIcon />}
            color="#f3e5f5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Tasks Completed"
            value={projects.reduce(
              (sum, project) => sum + project.tasks.completed,
              0
            )}
            icon={<CompletedIcon />}
            color="#e8f5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Organizations"
            value="4"
            icon={<BusinessIcon />}
            color="#e1f5fe"
          />
        </Grid>
      </Grid>

      {/* Admin Alerts */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#e8f5e9", height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    System Health
                  </Typography>
                  <Chip label="Good" color="success" size="small" />
                </Box>
                <Typography variant="body2" gutterBottom>
                  All systems are operating normally
                </Typography>
                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  <CircularProgress
                    variant="determinate"
                    value={98}
                    size={48}
                    thickness={4}
                    sx={{ color: "success.main", mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0 }}>
                      98%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Uptime
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#fff8e1", height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Pending Approvals
                  </Typography>
                  <Chip label="3" color="warning" size="small" />
                </Box>
                <Typography variant="body2" gutterBottom>
                  3 user registrations require approval
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  sx={{ mt: 2, color: "white" }}
                >
                  Review Now
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#e8eaf6", height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Weekly Activity
                  </Typography>
                  <TrendUpIcon color="primary" />
                </Box>
                <Typography variant="body2" gutterBottom>
                  Activity increased by 24% compared to last week
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Projects Table */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Project Overview</Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            New Project
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Project
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Progress
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Tasks
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Deadline
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Team
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} hover>
                  <TableCell>{project.name}</TableCell>
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
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                project.progress < 40
                                  ? "#f44336"
                                  : project.progress < 75
                                  ? "#ff9800"
                                  : "#4caf50",
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {project.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{`${project.tasks.completed}/${project.tasks.total}`}</TableCell>
                  <TableCell>{project.deadline}</TableCell>
                  <TableCell>
                    <AvatarGroup max={3}>
                      {project.team.map((member, index) => (
                        <Avatar
                          key={index}
                          sx={{
                            width: 30,
                            height: 30,
                            fontSize: "0.8rem",
                            bgcolor:
                              member === "AJ"
                                ? "#3f51b5"
                                : member === "TS"
                                ? "#f44336"
                                : member === "ML"
                                ? "#4caf50"
                                : member === "JC"
                                ? "#ff9800"
                                : "#9c27b0",
                          }}
                        >
                          {member}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Chip
                        label="View Board"
                        clickable
                        color="primary"
                        size="small"
                        onClick={() => {}}
                        sx={{ fontWeight: 500 }}
                      />
                      <Chip
                        label="Settings"
                        clickable
                        color="default"
                        size="small"
                        onClick={() => {}}
                        sx={{ fontWeight: 500 }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Recent Activity and Upcoming Deadlines */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivity />
        </Grid>
        <Grid item xs={12} md={6}>
          <UpcomingDeadlines />
        </Grid>
      </Grid>
    </>
  );
};

// Manager Dashboard Component
const ManagerDashboard = ({ projects }) => {
  return (
    <>
      {/* Manager Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Projects Managed"
            value={projects.length}
            icon={<TaskIcon />}
            color="#e3f2fd"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Team Members"
            value="5"
            icon={<TeamIcon />}
            color="#f3e5f5"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Tasks Completed"
            value={projects.reduce(
              (sum, project) => sum + project.tasks.completed,
              0
            )}
            icon={<CompletedIcon />}
            color="#e8f5e9"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Tasks Due Soon"
            value="8"
            icon={<DeadlineIcon />}
            color="#fff8e1"
          />
        </Grid>
      </Grid>

      {/* Manager Alerts */}
      <Box sx={{ mb: 4 }}>
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small">
              View
            </Button>
          }
        >
          <AlertIcon sx={{ mr: 1 }} />3 tasks are overdue in the Mobile App
          Redesign project
        </Alert>
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small">
              Review
            </Button>
          }
        >
          <AlertIcon sx={{ mr: 1 }} />5 tasks waiting for your review in
          Authentication Service project
        </Alert>
      </Box>

      {/* Projects Table */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">My Projects</Typography>
          <Button variant="outlined" startIcon={<AddIcon />}>
            New Project
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Project
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Progress
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Tasks
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Deadline
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Team
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderBottom: "2px solid #1976d2",
                    color: "primary.main",
                    paddingBottom: "12px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} hover>
                  <TableCell>{project.name}</TableCell>
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
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                project.progress < 40
                                  ? "#f44336"
                                  : project.progress < 75
                                  ? "#ff9800"
                                  : "#4caf50",
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {project.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{`${project.tasks.completed}/${project.tasks.total}`}</TableCell>
                  <TableCell>{project.deadline}</TableCell>
                  <TableCell>
                    <AvatarGroup max={3}>
                      {project.team.map((member, index) => (
                        <Avatar
                          key={index}
                          sx={{
                            width: 30,
                            height: 30,
                            fontSize: "0.8rem",
                            bgcolor:
                              member === "AJ"
                                ? "#3f51b5"
                                : member === "TS"
                                ? "#f44336"
                                : member === "ML"
                                ? "#4caf50"
                                : member === "JC"
                                ? "#ff9800"
                                : "#9c27b0",
                          }}
                        >
                          {member}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Chip
                        label="View Board"
                        clickable
                        color="primary"
                        size="small"
                        onClick={() => {}}
                        sx={{ fontWeight: 500 }}
                      />
                      <Chip
                        label="Manage"
                        clickable
                        color="secondary"
                        size="small"
                        onClick={() => {}}
                        sx={{ fontWeight: 500 }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Team Performance */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Team Performance
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Team Member</TableCell>
                <TableCell>Tasks Assigned</TableCell>
                <TableCell>Tasks Completed</TableCell>
                <TableCell>Completion Rate</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Alex Johnson</TableCell>
                <TableCell>12</TableCell>
                <TableCell>10</TableCell>
                <TableCell>83%</TableCell>
                <TableCell>
                  <Chip size="small" label="On Track" color="success" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Taylor Smith</TableCell>
                <TableCell>15</TableCell>
                <TableCell>13</TableCell>
                <TableCell>87%</TableCell>
                <TableCell>
                  <Chip size="small" label="On Track" color="success" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Morgan Lee</TableCell>
                <TableCell>8</TableCell>
                <TableCell>5</TableCell>
                <TableCell>63%</TableCell>
                <TableCell>
                  <Chip size="small" label="At Risk" color="warning" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jordan Chen</TableCell>
                <TableCell>10</TableCell>
                <TableCell>9</TableCell>
                <TableCell>90%</TableCell>
                <TableCell>
                  <Chip size="small" label="On Track" color="success" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Casey Kim</TableCell>
                <TableCell>7</TableCell>
                <TableCell>5</TableCell>
                <TableCell>71%</TableCell>
                <TableCell>
                  <Chip size="small" label="Needs Help" color="info" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Recent Activity and Upcoming Deadlines */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivity />
        </Grid>
        <Grid item xs={12} md={6}>
          <UpcomingDeadlines />
        </Grid>
      </Grid>
    </>
  );
};

// Regular User Dashboard Component
const UserDashboard = ({ projects }) => {
  // Filter projects to just show assigned ones (for demo purposes, show all)
  const assignedProjects = projects;

  const myTasks = [
    {
      id: 1,
      title: "Implement API Authentication",
      project: "Authentication Service",
      dueDate: "Tomorrow",
      priority: "High",
    },
    {
      id: 2,
      title: "Design Login Screen",
      project: "Mobile App Redesign",
      dueDate: "Next week",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Fix Navigation Bug",
      project: "Developer Portal",
      dueDate: "Mar 20, 2025",
      priority: "Low",
    },
    {
      id: 4,
      title: "Update Documentation",
      project: "Developer Portal",
      dueDate: "Mar 25, 2025",
      priority: "Low",
    },
  ];

  return (
    <>
      {/* User Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="My Projects"
            value={assignedProjects.length}
            icon={<TaskIcon />}
            color="#e3f2fd"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Tasks Assigned"
            value={myTasks.length}
            icon={<AssignmentIcon />}
            color="#f3e5f5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Tasks Completed"
            value="15"
            icon={<CompletedIcon />}
            color="#e8f5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Tasks Due Soon"
            value="2"
            icon={<DeadlineIcon />}
            color="#fff8e1"
          />
        </Grid>
      </Grid>

      {/* User Alert */}
      <Alert
        severity="info"
        sx={{ mb: 4 }}
        action={
          <Button color="inherit" size="small">
            View
          </Button>
        }
      >
        You have 2 tasks due in the next 48 hours.
      </Alert>

      {/* My Tasks */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">My Tasks</Typography>
          <Button variant="outlined" size="small" startIcon={<AddIcon />}>
            New Task
          </Button>
        </Box>
        <List>
          {myTasks.map((task, index) => (
            <ListItem
              key={task.id}
              divider={index < myTasks.length - 1}
              secondaryAction={
                <Chip
                  size="small"
                  label={task.priority}
                  sx={{
                    bgcolor: priorityColors[task.priority].bg,
                    color: priorityColors[task.priority].color,
                  }}
                />
              }
            >
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="medium">
                    {task.title}
                  </Typography>
                }
                secondary={
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Typography variant="caption" component="span">
                      {task.project}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{ color: "text.secondary" }}
                    >
                      •
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{
                        color:
                          task.dueDate === "Tomorrow"
                            ? "error.main"
                            : "text.secondary",
                      }}
                    >
                      Due: {task.dueDate}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Assigned Projects */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          My Projects
        </Typography>
        <Grid container spacing={2}>
          {assignedProjects.slice(0, 3).map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {project.description?.substring(0, 80)}...
                  </Typography>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="body2" gutterBottom>
                      Progress: {project.progress}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        height: 6,
                        borderRadius: 5,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            project.progress < 40
                              ? "#f44336"
                              : project.progress < 75
                              ? "#ff9800"
                              : "#4caf50",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Due: {project.deadline}
                    </Typography>
                    <Button size="small" variant="contained">
                      View Tasks
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recent Activity and Upcoming Deadlines */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivity />
        </Grid>
        <Grid item xs={12} md={6}>
          <UpcomingDeadlines />
        </Grid>
      </Grid>
    </>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, loading, error } = useSelector((state) => state.projects);

  // Fetch projects when component mounts
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <WelcomeMessage user={user} />

      {/* Render different dashboard based on user role */}
      {user?.role === "admin" && <AdminDashboard projects={projects} />}
      {user?.role === "manager" && <ManagerDashboard projects={projects} />}
      {user?.role === "user" && <UserDashboard projects={projects} />}
    </Box>
  );
};

export default DashboardPage;
