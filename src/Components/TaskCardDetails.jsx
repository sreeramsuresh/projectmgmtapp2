// components/TaskCardDetails.jsx
const TaskCardDetails = ({ task }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <PriorityChip
          label={task.priority}
          priority={task.priority}
          size="small"
        />

        <Stack direction="row" spacing={1} alignItems="center">
          {task.assignee && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {task.assignee}
              </Typography>
            </Stack>
          )}

          {task.dueDate && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {task.dueDate}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>

      {task.tags && task.tags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
          {task.tags.map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.75rem",
                backgroundColor: "grey.100",
              }}
            />
          ))}
        </Box>
      )}
    </>
  );
};
