// src/Pages/TeamPage.jsx
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Mail as MailIcon } from "@mui/icons-material";

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Project Manager",
    email: "alex@example.com",
    avatar: "AJ",
    skills: ["Project Management", "Agile", "Scrum"],
    projects: ["Developer Portal", "Analytics Dashboard"],
  },
  {
    id: 2,
    name: "Jordan Chen",
    role: "Backend Developer",
    email: "jordan@example.com",
    avatar: "JC",
    skills: ["Node.js", "Python", "Database Design"],
    projects: ["Developer Portal", "Authentication Service"],
  },
  {
    id: 3,
    name: "Taylor Smith",
    role: "Frontend Developer",
    email: "taylor@example.com",
    avatar: "TS",
    skills: ["React", "TypeScript", "UI/UX"],
    projects: ["Developer Portal", "Analytics Dashboard"],
  },
  {
    id: 4,
    name: "Morgan Lee",
    role: "Designer",
    email: "morgan@example.com",
    avatar: "ML",
    skills: ["UI Design", "UX Research", "Figma"],
    projects: ["Mobile App Redesign", "Authentication Service"],
  },
  {
    id: 5,
    name: "Casey Kim",
    role: "QA Engineer",
    email: "casey@example.com",
    avatar: "CK",
    skills: ["Test Automation", "Manual Testing", "CI/CD"],
    projects: ["Mobile App Redesign", "Analytics Dashboard"],
  },
];

const TeamPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Team
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Team Member
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} md={6} lg={4} key={member.id}>
            <TeamMemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "primary.main",
              mr: 2,
              fontSize: "1.25rem",
            }}
          >
            {member.avatar}
          </Avatar>
          <Box>
            <Typography variant="h6">{member.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {member.role}
            </Typography>
          </Box>
        </Box>

        <Button
          startIcon={<MailIcon />}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        >
          {member.email}
        </Button>

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Skills
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {member.skills.map((skill, index) => (
            <Chip key={index} label={skill} size="small" />
          ))}
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Projects
        </Typography>
        <List dense disablePadding>
          {member.projects.map((project, index) => (
            <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
              <ListItemText primary={project} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TeamPage;
