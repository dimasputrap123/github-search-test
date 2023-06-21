import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ height: "calc(100vh - 100px)", display: "flex" }}>
      <Box margin="auto" textAlign="center">
        <CircularProgress size={100} />
        <Typography variant="h4">Loading</Typography>
      </Box>
    </Box>
  );
};

export default Loading;
