import { Box, Button, InputBase } from "@mui/material";
import React from "react";

const SearchInput = (props: { onSubmit: (data: string) => void }) => {
  const [state, setState] = React.useState({
    search: "",
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, search: e.target.value }));
  };
  const handleSubmit = () => {
    props.onSubmit(state.search);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        width: "400px",
        mb: 3,
      }}
    >
      <InputBase
        sx={{
          pl: "5px",
          border: "1px solid #cecece",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
        }}
        fullWidth
        onChange={handleSearch}
      />
      <Button
        size="small"
        onClick={handleSubmit}
        variant="contained"
        disableElevation
        sx={{
          borderRadius: 0,
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      >
        Seach
      </Button>
    </Box>
  );
};

export default SearchInput;
