import mongoose from "mongoose";
import Role from "../models/Role";
import User from "../models/User";
import bcrypt from "bcrypt";
import "dotenv/config";

export const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/auth");

    checkingRoles();
    checkingUsers();
  } catch (err) {
    console.log(err);
  }
};

const checkingRoles = async function () {
  const rolesCount = await Role.countDocuments();

  if (rolesCount === 0) {
    await Role.create({ value: "ADMIN" });
    await Role.create({ value: "USER" });
    console.log("Roles are added to DB");
  } else {
    console.log("Roles are existed in DB");
  }
};

const checkingUsers = async function () {
  const usersCount = await User.countDocuments();

  if (usersCount === 0) {
    const hashedUserPassword = await bcrypt.hash("user11", 10);
    const hashedAdminPassword = await bcrypt.hash("admin1", 10);

    await User.create({
      userName: "User",
      email: "user@test.test",
      roles: ["USER"],
      password: hashedUserPassword,
    });
    await User.create({
      userName: "Admin",
      email: "admin@test.test",
      roles: ["ADMIN"],
      password: hashedAdminPassword,
    });
    console.log("Users are added to DB");
  } else {
    console.log("Users are existed in DB");
  }
};
