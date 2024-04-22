import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/", // надо будет переделать

  prepareHeaders: (headers, api) => {
    const token =
      (api.getState() as RootState).auth.user?.token ||
      localStorage.getItem("token");
    console.log("token", token);
    if (token && token !== null) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
