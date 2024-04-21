import { Request, Response } from "express";
import User, { UserType } from "../models/User";
import Role from "../models/Role";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.config";
import { Types } from "mongoose";

const generateAccessToken = (
  id: Types.ObjectId,
  userName: string,
  email: string,
  roles: string[],
) => {
  const payload = {
    id,
    userName,
    email,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      console.log("errors", errors);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: `Registration error, ${errors}` });
      }

      const { userName, email, password } = req.body;
      const candidate = await User.findOne({ userName });
      const candidateEmail = await User.findOne({ email });
      if (candidate) {
        res
          .status(400)
          .json({ message: "A user with that name already exists" });
      }
      if (candidateEmail) {
        res
          .status(400)
          .json({ message: "A user with that email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 6);
      const userRole = await Role.findOne({ value: "USER" });
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        roles: [userRole?.value],
      });
      await newUser.save();
      return res
        .status(200)
        .json({ message: "The user has been successfully registered" });
    } catch (err) {
      console.log(`Registration error :${err}`);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = (await User.findOne({ email })) as UserType;
      if (!user) {
        res
          .send(400)
          .json({ message: `User with email ${email} has not been found` });
      }

      const validPassword = bcrypt.compare(password, user?.password);
      if (!validPassword) {
        res.send(400).json({ message: `The wrong password was entered` });
      }

      const token = generateAccessToken(
        user._id,
        user.userName,
        user.email,
        user.roles,
      );
      return res.status(200).json({
        id: user._id,
        userName: user.userName,
        email: user.email,
        roles: user.roles,
        token,
      });
    } catch (err) {
      console.log(`Login error :${err}`);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (err) {
      console.log(`getUsers error :${err}`);
      res.status(400).json({ message: "getUsers error" });
    }
  }

  async currentUser(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }
}

export default new authController();
