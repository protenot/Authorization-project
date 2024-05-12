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

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            message: `Ошибка при регистрации, ${JSON.stringify(errors)}`,
          });
      }

      const { userName, email, password } = req.body;
      const candidate = await User.findOne({ userName });
      const candidateEmail = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: "Пользователь с такой почтой уже существует" });
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
      /* return res
        .status(200)
        .json({ message: "Пользователь был успешно зарегистрирован" }); */
      const token = generateAccessToken(
        newUser._id,
        newUser.userName,
        newUser.email,
        newUser.roles,
      );
      return res.status(200).json({
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        roles: newUser.roles,
        token,
      });
    } catch (err) {
      console.log(`Registration error :${err}`);
      return res.status(400).json({ message: "Ошибочка при регистрации" });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = (await User.findOne({ email })) as UserType;
      console.log("user", user);
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь с адресом ${email} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user?.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
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
      return res.status(400).json({ message: "Ошибка входа" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await User.find();
      return res.json(allUsers);
    } catch (err) {
      console.log(`getUsers error :${err}`);
      return res
        .status(400)
        .json({ message: "Ошибка при получении пользователей" });
    }
  }

  async currentUser(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }
}

export default new authController();
