import React from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Assignment as TaskIcon,
  CheckCircle as CompletedIcon,
  Schedule as DeadlineIcon,
  Group as TeamIcon,
} from "@mui/icons-material";
import PieChart from "../Components/PieChart";

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

// Data for Task Status Chart
const taskStatusData = [
  { name: "Completed", value: 51, color: "#4caf50" },
  { name: "In Progress", value: 23, color: "#2196f3" },
  { name: "Review", value: 12, color: "#ff9800" },
  { name: "Backlog", value: 33, color: "#9e9e9e" },
];

// Data for Team Workload Chart
const teamWorkloadData = [
  { name: "Alex J.", value: 15, color: "#3f51b5" },
  { name: "Taylor S.", value: 18, color: "#f44336" },
  { name: "Morgan L.", value: 12, color: "#4caf50" },
  { name: "Jordan C.", value: 11, color: "#ff9800" },
  { name: "Casey K.", value: 9, color: "#9c27b0" },
];

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
  const navigate = useNavigate();

  // Calculate summary data
  const totalTasks = projectSummary.reduce(
    (sum, project) => sum + project.tasks.total,
    0
  );

  const completedTasks = projectSummary.reduce(
    (sum, project) => sum + project.tasks.completed,
    0
  );

  const pendingTasks = totalTasks - completedTasks;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Project Progress section - full width */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Project Progress
            </Typography>
            {/* Dashboard charts would go here */}
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={3}>
                <StatsCard
                  title="Total Projects"
                  value={projectSummary.length}
                  icon={<TaskIcon />}
                  color="#e3f2fd"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatsCard
                  title="Tasks Completed"
                  value={completedTasks}
                  icon={<CompletedIcon />}
                  color="#e8f5e9"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatsCard
                  title="Pending Tasks"
                  value={pendingTasks}
                  icon={<TaskIcon />}
                  color="#fff8e1"
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
            </Grid>
          </Paper>
        </Grid>

        {/* Charts row */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 380 }}>
            <PieChart
              data={taskStatusData}
              title="Task Status Distribution"
              width={500}
              height={330}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 380 }}>
            <PieChart
              data={teamWorkloadData}
              title="Team Workload Distribution"
              width={500}
              height={330}
            />
          </Paper>
        </Grid>

        {/* Current Projects section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Projects
            </Typography>
            {/* Projects summary would go here */}
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
                  {projectSummary.map((project) => (
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
                        <Chip
                          label="View Board"
                          clickable
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/kanban/${project.id}`)}
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Activity moved to bottom row */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 240, overflow: "auto" }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {/* Activity feed would go here */}
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
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
                  {index < recentActivities.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Added Upcoming Deadlines section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 240, overflow: "auto" }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Deadlines
            </Typography>
            {/* Deadlines would go here */}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
