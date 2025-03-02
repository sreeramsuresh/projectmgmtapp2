import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

const TeamPage = () => {
  // Sample team data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      initials: "AJ",
      role: "Project Manager",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      skills: ["Management", "Agile", "Scrum", "Planning"],
      avatar: "#3f51b5",
      assignedProjects: 2,
    },
    {
      id: 2,
      name: "Taylor Smith",
      initials: "TS",
      role: "Frontend Developer",
      email: "taylor.smith@example.com",
      phone: "+1 (555) 234-5678",
      skills: ["React", "JavaScript", "CSS", "UI/UX"],
      avatar: "#f44336",
      assignedProjects: 3,
    },
    {
      id: 3,
      name: "Morgan Lee",
      initials: "ML",
      role: "UI/UX Designer",
      email: "morgan.lee@example.com",
      phone: "+1 (555) 345-6789",
      skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
      avatar: "#4caf50",
      assignedProjects: 2,
    },
    {
      id: 4,
      name: "Jordan Chen",
      initials: "JC",
      role: "Backend Developer",
      email: "jordan.chen@example.com",
      phone: "+1 (555) 456-7890",
      skills: ["Node.js", "Java", "Python", "SQL"],
      avatar: "#ff9800",
      assignedProjects: 2,
    },
    {
      id: 5,
      name: "Casey Kim",
      initials: "CK",
      role: "DevOps Engineer",
      email: "casey.kim@example.com",
      phone: "+1 (555) 567-8901",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      avatar: "#9c27b0",
      assignedProjects: 2,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Team Members
      </Typography>

      {/* Team Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h3" align="center">
                {teamMembers.length}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
              >
                Team Members
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h3" align="center">
                {teamMembers.reduce(
                  (total, member) => total + member.assignedProjects,
                  0
                )}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
              >
                Assigned Tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h3" align="center">
                4
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
              >
                Active Projects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {teamMembers.map((member, index) => (
            <React.Fragment key={member.id}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemAvatar sx={{ mr: 2 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      fontSize: "1.5rem",
                      bgcolor: member.avatar,
                    }}
                  >
                    {member.initials}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="h6" component="span">
                        {member.name}
                      </Typography>
                      <Chip
                        label={member.role}
                        size="small"
                        sx={{ ml: 2, bgcolor: "background.default" }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EmailIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 0.5 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {member.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PhoneIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 0.5 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {member.phone}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AssignmentIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 0.5 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {member.assignedProjects} projects
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mt: 1,
                        }}
                      >
                        {member.skills.map((skill, i) => (
                          <Chip
                            key={i}
                            label={skill}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: "div" }}
                />
              </ListItem>
              {index < teamMembers.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TeamPage;
