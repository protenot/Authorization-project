import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/", 

  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState;
    const token =
      state.auth.user?.token ||
      localStorage.getItem("token");
    console.log("token", token);
    if (token && token !== null) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});


export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
