import { Types } from "mongoose";

export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};
export interface UserType {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  roles: string[];
}

export type ResponseLoginData = UserType & { token: string };

export type UserData = Omit<UserType, "_id">;

export type MealType = {
  id: string;
  title: string;
  serving: string;
  readyInMinutes: string;
  sourceUrl: string;
  image: string;
  servings: string;
  nutrients: {};
};

export type NutrientsType = {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
};

export type MealResponseType = {
  meals: MealType[];
  nutrients: NutrientsType;
};
