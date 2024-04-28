import { api } from "./api";
import { ResponseLoginData, UserType } from "../../types";;

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<ResponseLoginData[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    getOneUser: builder.query<ResponseLoginData, string>({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<string, UserType>({
      query: (user) => ({
        url: `/users/edit/${user._id}`,
        method: "PUT",
        body: user,
      }),
    }),

    deleteUser: builder.mutation<string, string>({
      query: (_id) => ({
        url: `/users/delete/${_id}`,
        method: "DELETE",
        body: { _id },
      }),
    }),
    addUser: builder.mutation<UserType, UserType>({
      query: (user) => ({
        url: `/users/add`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = usersApi;

export const {
  endpoints: { getAllUsers, getOneUser, editUser, addUser, deleteUser },
} = usersApi;
