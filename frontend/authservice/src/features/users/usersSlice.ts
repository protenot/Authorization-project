import { createSlice } from "@reduxjs/toolkit";
import { ResponseLoginData } from "../../types";
import { usersApi } from "../../app/services/users";
import { RootState } from "../../app/store";
import { UserType } from "../../../../../backend/authServer/src/models/User";

interface InitialState {
  users: ResponseLoginData[] | null | UserType;
}

const initialState: InitialState = {
  users: null,
};
const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getAllUsers.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      },
    );
    builder.addMatcher(
      usersApi.endpoints.addUser.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      },
    );
  },
});

export default slice.reducer;

export const selectUsers = (state: RootState) => state.users;
