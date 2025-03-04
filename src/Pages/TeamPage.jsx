import React, { useState } from "react";
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
  Button,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Assignment as AssignmentIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import TeamMemberFormDialog from "./../Components/TeamMemberFormDialog";
import ConfirmationDialog from "./../Components/ConfirmationDialog";

const TeamPage = () => {
  // State for the team members
  const [teamMembers, setTeamMembers] = useState([
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
  ]);

  // State for dialogs visibility
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    memberId: null,
    memberName: "",
  });

  // State for notifications
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Handle adding a new team member
  const handleAddTeamMember = (newMember) => {
    setTeamMembers([...teamMembers, newMember]);
    setNotification({
      open: true,
      message: `${newMember.name} has been added to the team.`,
      severity: "success",
    });
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (memberId, memberName) => {
    setDeleteDialog({
      open: true,
      memberId,
      memberName,
    });
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      memberId: null,
      memberName: "",
    });
  };

  // Handle deleting a team member
  const handleDeleteTeamMember = () => {
    const { memberId, memberName } = deleteDialog;
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
    closeDeleteDialog();
    setNotification({
      open: true,
      message: `${memberName} has been removed from the team.`,
      severity: "success",
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  // Calculate total assigned projects
  const totalAssignedProjects = teamMembers.reduce(
    (total, member) => total + member.assignedProjects,
    0
  );

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
          Team Members
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Team Member
        </Button>
      </Box>

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
                {totalAssignedProjects}
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" component="span">
                          {member.name}
                        </Typography>
                        <Chip
                          label={member.role}
                          size="small"
                          sx={{ ml: 2, bgcolor: "background.default" }}
                        />
                      </Box>
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() =>
                              openDeleteDialog(member.id, member.name)
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
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

      {/* Add Team Member Dialog */}
      <TeamMemberFormDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddTeamMember={handleAddTeamMember}
      />

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={deleteDialog.open}
        title="Confirm Delete"
        message={`Are you sure you want to remove ${deleteDialog.memberName} from the team?`}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteTeamMember}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeamPage;
