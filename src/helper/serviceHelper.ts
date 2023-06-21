import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { APIError } from "../types";
import { removeLoading, setResponse } from "../features/stateSlice";

export const readErrResponse = (
  error: APIError,
  dispatch: ThunkDispatch<any, unknown, Action<string>>,
  key: string,
  url?: string
) => {
  dispatch(
    setResponse({
      data: { ...error, url },
      key:
        error.code === 401
          ? "unauthorized"
          : error.code === "ERR_NETWORK"
          ? error.code
          : "res_err",
      msg: error.message,
      status: false,
    })
  );
  dispatch(removeLoading(key));
};
