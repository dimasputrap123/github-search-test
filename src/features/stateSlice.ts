import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateData, TmpType } from "../types";

const initialState: StateData = {
  loading: [],
  tmp_result: [],
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<string>) {
      state.loading.push(action.payload);
    },
    removeLoading(state, action: PayloadAction<string>) {
      state.loading = state.loading.filter((e) => e !== action.payload);
    },
    setResponse(state, action: PayloadAction<TmpType>) {
      if (action.payload.key === "unauthorized") {
        const check = state.tmp_result.findIndex(
          (e) => e.key === "unauthorized"
        );
        if (check === -1) {
          state.tmp_result.push(action.payload);
        }
      } else {
        const check = state.tmp_result.findIndex(
          (e) =>
            e.key === action.payload.key && e.status === action.payload.status
        );
        if (check === -1) {
          state.tmp_result.push(action.payload);
        }
      }
    },
    removeResponse(state, action: PayloadAction<TmpType>) {
      state.tmp_result = state.tmp_result.filter(
        (item) => item.key !== action.payload.key
      );
    },
  },
});

export const { removeLoading, removeResponse, setLoading, setResponse } =
  stateSlice.actions;
export default stateSlice.reducer;
