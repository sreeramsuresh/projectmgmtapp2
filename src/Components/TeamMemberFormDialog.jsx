// src/Components/TeamMemberFormDialog.jsx
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Close as CloseIcon, Add as AddIcon } from "@mui/icons-material";

const TeamMemberFormDialog = ({ open, onClose, onAddTeamMember }) => {
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    skills: [],
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (!currentSkill.trim()) return;

    setNewMember({
      ...newMember,
      skills: [...newMember.skills, currentSkill.trim()],
    });
    setCurrentSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setNewMember({
      ...newMember,
      skills: newMember.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!newMember.name || !newMember.role || !newMember.email) {
      return;
    }

    // Create a new team member object
    const teamMember = {
      ...newMember,
      id: Date.now(), // Generate a temporary ID
      initials: getInitials(newMember.name),
      avatar: getRandomColor(),
      assignedProjects: 0,
    };

    onAddTeamMember(teamMember);

    // Reset form
    setNewMember({
      name: "",
      role: "",
      email: "",
      phone: "",
      skills: [],
    });
    setCurrentSkill("");
    onClose();
  };

  // Helper function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Helper function to get a random color
  const getRandomColor = () => {
    const colors = [
      "#3f51b5",
      "#f44336",
      "#4caf50",
      "#ff9800",
      "#9c27b0",
      "#2196f3",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">Add Team Member</Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Name"
              name="name"
              value={newMember.name}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Role"
              name="role"
              value={newMember.role}
              onChange={handleChange}
              margin="normal"
              placeholder="e.g., Frontend Developer"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              type="email"
              value={newMember.email}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={newMember.phone}
              onChange={handleChange}
              margin="normal"
              placeholder="+1 (555) 123-4567"
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
              <TextField
                fullWidth
                label="Skills"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                margin="normal"
                placeholder="Add skills and press Enter"
              />
              <Button
                variant="contained"
                onClick={handleAddSkill}
                sx={{ ml: 1, minWidth: "auto", height: 40, mt: 1 }}
              >
                <AddIcon />
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {newMember.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  sx={{ margin: 0.5 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!newMember.name || !newMember.role || !newMember.email}
        >
          Add Team Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamMemberFormDialog;
