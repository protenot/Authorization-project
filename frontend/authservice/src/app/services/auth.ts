import { api } from "./api";
import { ResponseLoginData, UserData } from "../../types";


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData: UserData) => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
    }),

    registration: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/auth/registration",
        method: "POST",
        body: userData,
      }),
    }),
    users: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
    }),

    currentUser: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/auth/currentUser",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useUsersQuery,
  useCurrentUserQuery,
} = authApi;
export const {
  endpoints: { login, registration, users, currentUser },
} = authApi;
