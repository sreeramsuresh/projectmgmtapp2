// components/SidebarFilters.jsx
import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const SidebarFilters = () => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "grey.500",
              "&.Mui-checked": { color: "primary.main" },
            }}
          />
        }
        label="My Tasks"
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "grey.500",
              "&.Mui-checked": { color: "primary.main" },
            }}
          />
        }
        label="High Priority"
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "grey.500",
              "&.Mui-checked": { color: "primary.main" },
            }}
          />
        }
        label="Due Soon"
      />
    </>
  );
};

export default SidebarFilters;
