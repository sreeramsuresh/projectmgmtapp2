import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  FormHelperText,
} from "@mui/material";
import { Close as CloseIcon, Add as AddIcon } from "@mui/icons-material";

// Sample team members data
const teamMembers = [
  { id: 1, name: "Alex Johnson", initials: "AJ", color: "#3f51b5" },
  { id: 2, name: "Taylor Smith", initials: "TS", color: "#f44336" },
  { id: 3, name: "Morgan Lee", initials: "ML", color: "#4caf50" },
  { id: 4, name: "Jordan Chen", initials: "JC", color: "#ff9800" },
  { id: 5, name: "Casey Kim", initials: "CK", color: "#9c27b0" },
];

const CreateProjectDialog = ({ open, onClose, onCreateProject }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    deadline: "",
    team: [],
    category: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleTeamChange = (e) => {
    setProject({
      ...project,
      team: e.target.value,
    });
  };

  const handleClose = () => {
    // Reset form state
    setProject({
      name: "",
      description: "",
      deadline: "",
      team: [],
      category: "",
      tags: "",
    });
    setErrors({});
    onClose();
  };

  const handleSubmit = () => {
    // Validate form
    const newErrors = {};

    if (!project.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!project.description.trim()) {
      newErrors.description = "Project description is required";
    }

    if (!project.deadline.trim()) {
      newErrors.deadline = "Deadline is required";
    }

    if (!project.category) {
      newErrors.category = "Category is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process tags if any
    const processedTags = project.tags
      ? project.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")
      : [];

    // Create project object
    const newProject = {
      id: `project-${Date.now()}`, // Generate temp ID (would be handled by backend in real app)
      name: project.name,
      description: project.description,
      deadline: project.deadline,
      progress: 0, // New project starts at 0% progress
      tasks: { total: 0, completed: 0 }, // No tasks initially
      team: project.team,
      category: project.category,
      tags: processedTags,
    };

    // Call the create function from parent
    onCreateProject(newProject);

    // Close dialog and reset
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Create New Project</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Project Name"
              fullWidth
              required
              value={project.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              required
              multiline
              rows={3}
              value={project.description}
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="deadline"
              label="Deadline (e.g., Mar 15, 2025)"
              fullWidth
              required
              value={project.deadline}
              onChange={handleChange}
              placeholder="Mar 15, 2025"
              error={Boolean(errors.deadline)}
              helperText={
                errors.deadline || "Enter deadline in format: Mar 15, 2025"
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={Boolean(errors.category)}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={project.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="development">Development</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="research">Research</MenuItem>
                <MenuItem value="infrastructure">Infrastructure</MenuItem>
              </Select>
              {errors.category && (
                <FormHelperText>{errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="team-members-label">Team Members</InputLabel>
              <Select
                labelId="team-members-label"
                multiple
                value={project.team}
                onChange={handleTeamChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((memberId) => {
                      const member = teamMembers.find((m) => m.id === memberId);
                      return (
                        <Chip
                          key={memberId}
                          label={member.name}
                          avatar={
                            <Avatar sx={{ bgcolor: member.color }}>
                              {member.initials}
                            </Avatar>
                          }
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {teamMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          fontSize: "0.8rem",
                          bgcolor: member.color,
                        }}
                      >
                        {member.initials}
                      </Avatar>
                      {member.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="tags"
              label="Tags (comma separated)"
              fullWidth
              value={project.tags}
              onChange={handleChange}
              placeholder="frontend, api, design"
              helperText="Separate tags with commas"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<AddIcon />}
        >
          Create Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProjectDialog;
