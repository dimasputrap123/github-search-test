import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataPage, ListRepoItem, ListUserItem, RepoState } from "../types";

const initialState: RepoState = {
  dataPage: { data: [], page: 1, per_page: 20 },
  repoList: {},
};

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setDataPage(state, action: PayloadAction<DataPage>) {
      state.dataPage.data = action.payload.data;
      state.dataPage.page = action.payload.page;
      state.dataPage.per_page = action.payload.per_page;
    },
    setItemData(state, action: PayloadAction<ListUserItem>) {
      const id = action.payload?.id;
      const indexItem = state.dataPage.data.findIndex((data) => data.id === id);
      state.dataPage.data[indexItem] = action.payload;
    },
    setRepoItemData(state, action: PayloadAction<ListRepoItem[]>) {
      if (action.payload.length > 0) {
        const id = action.payload[0].owner?.id;
        if (id) {
          const tmp = { ...state.repoList, [id]: action.payload };
          state.repoList = tmp;
        }
      }
    },
  },
});

export const { setDataPage, setItemData, setRepoItemData } = repoSlice.actions;
export default repoSlice.reducer;
