import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { ListUserItem } from "../types";
import { useAppDispatch } from "../config/hookRedux";
import { getDataUser } from "../features/repoServices";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CardUser = (props: {
  data: ListUserItem;
  onClick?: (data: ListUserItem) => void;
}) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getDataUser(props.data.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.data);
    }
  };
  return (
    <Card
      onClick={handleClick}
      sx={{
        p: 2,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,0.1)",
          transition: "background-color .5s",
        },
      }}
    >
      <Stack direction="row" alignItems="center">
        <Avatar sx={{ width: 56, height: 56 }} src={props.data.avatar_url} />
        <CardContent>
          <Typography variant="h6">{props.data.name || "-"}</Typography>
          <Stack spacing={2} direction="row">
            <Typography>Following: {props.data.following}</Typography>
            <Typography>Followers: {props.data.followers}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <LocationOnIcon />
            <Typography
              variant="body1"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {props.data.location || "-"}
            </Typography>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default React.memo(CardUser);
