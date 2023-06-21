import endpoint from "../config/api";
import { axiosInstances } from "../config/request";
import { AppThunk } from "../config/store";
import { readErrResponse } from "../helper/serviceHelper";
import { APIError } from "../types";
import { setDataPage, setItemData, setRepoItemData } from "./repoSlice";
import { removeLoading, setLoading } from "./stateSlice";

export const getListUser =
  (payload: { search: string; mode: "next" | "search" }): AppThunk =>
  async (dispatch, getState) => {
    const key = "getListUser";
    let pageFilter = 1,
      perPageFilter = 50;
    if (payload.mode === "next") {
      const { page, per_page } = getState().repo.dataPage;
      pageFilter = page;
      perPageFilter = per_page;
    }
    dispatch(setLoading(key));
    try {
      const result = await axiosInstances.get(
        endpoint.list_users +
          "?per_page=" +
          perPageFilter +
          "&page=" +
          pageFilter +
          "&q=" +
          payload.search
      );
      dispatch(removeLoading(key));
      dispatch(
        setDataPage({
          page:
            payload.mode === "next" ? pageFilter + perPageFilter : pageFilter,
          per_page: perPageFilter,
          data: result.data.items,
        })
      );
    } catch (error) {
      const err = error as APIError;
      readErrResponse(err, dispatch, key);
    }
  };

export const getDataUser =
  (payload: string | undefined): AppThunk =>
  async (dispatch) => {
    if (!payload) {
      return;
    }
    const key = "getDataUser";
    dispatch(setLoading(key));
    try {
      const result = await axiosInstances.get(payload);
      dispatch(setItemData(result.data));
      dispatch(removeLoading(key));
    } catch (error) {
      const err = error as APIError;
      readErrResponse(err, dispatch, key);
    }
  };

export const getRepoUser =
  (payload: string | undefined): AppThunk =>
  async (dispatch) => {
    if (!payload) {
      return;
    }
    const key = "getRepoUser";
    dispatch(setLoading(key));
    try {
      const result = await axiosInstances.get(payload);
      dispatch(setRepoItemData(result.data));
      dispatch(removeLoading(key));
    } catch (error) {
      const err = error as APIError;
      readErrResponse(err, dispatch, key);
    }
  };
