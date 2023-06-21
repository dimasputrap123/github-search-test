import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import repoSlice from "../features/repoSlice";
import stateSlice from "../features/stateSlice";

export const store = configureStore({
  reducer: { repo: repoSlice, state: stateSlice },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
