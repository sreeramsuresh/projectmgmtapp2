// components/BoardList.jsx
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const BoardList = ({ boards, currentBoard, setCurrentBoard }) => {
  return (
    <List disablePadding>
      {boards.map((board) => (
        <ListItem key={board.id} disablePadding>
          <ListItemButton
            selected={currentBoard === board.id}
            onClick={() => setCurrentBoard(board.id)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: "grey.800",
                "&:hover": {
                  backgroundColor: "grey.700",
                },
              },
              "&:hover": {
                backgroundColor: "grey.800",
              },
            }}
          >
            <ListItemText primary={board.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default BoardList;
