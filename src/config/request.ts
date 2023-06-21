import axios, { AxiosResponse } from "axios";
import { base_url } from "./api";
import { APIError } from "../types";

const InternalError = {
  message: "Internal error during request",
  code: 500,
  status: false,
};

export const axiosInstances = axios.create({
  baseURL: base_url,
  timeout: 30000,
  timeoutErrorMessage: "Respond timeout",
});

const getExceptionPayload = (ex: unknown): APIError => {
  if (typeof ex !== "object" || null) {
    return InternalError;
  }
  if (axios.isAxiosError(ex)) {
    return { message: ex.message, status: false, code: ex.code };
  } else if (ex as AxiosResponse) {
    const err = ex as AxiosResponse;
    return { message: err.data.message, code: err.status, status: false };
  }
  return InternalError;
};

axiosInstances.interceptors.request.use(
  function (request) {
    request.headers.Authorization = process.env.REACT_APP_TOKEN;
    return request;
  },
  function (error) {
    return Promise.reject(getExceptionPayload(error));
  }
);
