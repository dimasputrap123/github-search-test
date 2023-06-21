import { Grid, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./config/hookRedux";
import { getListUser } from "./features/repoServices";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import CardUser from "./component/CardUser";
import useLoadingListener from "./component/hook/useLoadingListener";
import SearchInput from "./component/SearchInput";
import Loading from "./component/Loading";
import DialogDetail from "./component/DialogDetail";
import React from "react";
import { ListUserItem } from "./types";

const App = () => {
  const dispatch = useAppDispatch();

  const dialogRef = React.useRef<React.ElementRef<typeof DialogDetail>>(null);

  const listUser = useAppSelector((state) => state.repo.dataPage.data);

  const loading = useLoadingListener("getListUser");

  const handleSubmit = (data: string) => {
    dispatch(getListUser({ search: data, mode: "search" }));
  };

  const handleClick = (data: ListUserItem) => {
    dialogRef.current?.setData(data);
    dialogRef.current?.openDialog();
  };

  return (
    <>
      <Stack direction="row" spacing={5} alignItems="center" mb={2}>
        <Typography>Github user search</Typography>
        <SearchInput onSubmit={handleSubmit} />
      </Stack>
      {loading ? (
        <Loading />
      ) : (
        <SimpleBar style={{ maxHeight: "calc(100vh - 100px)" }}>
          <Grid container spacing={2}>
            {listUser.map((item, id) => (
              <Grid item md={4} xs={12} key={id}>
                <CardUser onClick={handleClick} data={item} />
              </Grid>
            ))}
          </Grid>
        </SimpleBar>
      )}
      <DialogDetail ref={dialogRef} />
    </>
  );
};

export default App;
