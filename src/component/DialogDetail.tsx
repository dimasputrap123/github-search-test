import React from "react";
import { ListUserItem } from "../types";
import { useDisclose } from "./hook/useDisclose";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../config/hookRedux";
import { getRepoUser } from "../features/repoServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

type Method = {
  openDialog: () => void;
  setData: (data: ListUserItem) => void;
};

const DialogDetail: React.ForwardRefRenderFunction<Method> = (props, ref) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [state, setState] = React.useState<ListUserItem>();
  const [id, setId] = React.useState<number>(0);
  const dataUser = useAppSelector((state) => state.repo.dataPage.data);
  const dataRepo = useAppSelector((state) => state.repo.repoList);
  const dispatch = useAppDispatch();
  React.useImperativeHandle(ref, () => ({
    openDialog: () => {
      onOpen();
    },
    setData: (data) => {
      setId(data.id || 0);
    },
  }));
  React.useEffect(() => {
    if (id !== 0) {
      const data = dataUser.filter((e) => e.id === id);
      if (data.length === 1) {
        setState(data[0]);
        dispatch(getRepoUser(data[0].repos_url));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth="md" onClose={onClose}>
      <DialogContent sx={{ marginY: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Avatar sx={{ width: 200, height: 200 }} src={state?.avatar_url} />
          </Grid>
          <Grid item xs={8}>
            <Typography fontWeight="600" variant="h5">
              {state?.name}
            </Typography>
            <Typography variant="h6">{state?.bio || "-"}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PeopleAltIcon />
              <Typography variant="h6">{state?.company}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <InsertLinkIcon />
              <Typography variant="h6">{state?.blog || "-"}</Typography>
            </Stack>
            <Stack spacing={2} direction="row">
              <Typography variant="h6">
                Following: {state?.following}
              </Typography>
              <Typography variant="h6">
                Followers: {state?.followers}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h4" my={2}>
          Repository
        </Typography>
        {dataRepo[id]?.map((e, id) => (
          <>
            <Box key={id}>
              <Typography mb={2} color="green" variant="h5" fontWeight="600">
                {e.name}
              </Typography>
              <Typography mb={2} color="green" variant="h5" fontWeight="600">
                {e.description || "-"}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h6">{e.language}</Typography>
                  <Rating
                    value={
                      e.stargazers_count ? parseInt(e.stargazers_count) : 0
                    }
                    readOnly
                  />
                </Stack>
              </Stack>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default React.forwardRef(DialogDetail);
