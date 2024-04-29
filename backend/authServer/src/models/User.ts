import { Schema, model, Types } from "mongoose";

export interface UserType {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  roles: string[];
}
const User = new Schema<UserType>({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },

  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

export default model("User", User);
