import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

class usersController {
  async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (err) {
      console.log(`getUsers error :${err}`);
      res.status(400).json({ message: "Не удалось загрузить пользователей" });
    }
  }
  async getOneUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400);
        console.error("Не удалось получить  данные пользователя");
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Не удалось получить  данные пользователя" });
    }
  }
  async editUser(req: Request, res: Response) {
    try {
      const data = { ...req.body };
      const id = req.params.id;

      const editedUser = await User.findByIdAndUpdate(id, { $set: data });

      if (editedUser) {
        res
          .status(200)
          .json({ message: `Пользователь ${data.userName} успешно обновлен` });
      } else {
        res.status(404).json({ message: "Пользователь не найден" });
      }
    } catch (err) {
      console.log(`editUser error :${err}`);
      res
        .status(500)
        .json({ message: "Не удалось отредактировать данные пользователя" });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (id) {
        const deletedUser = await User.deleteOne({ _id: id });
        if (deletedUser.deletedCount === 1) {
          console.log("deletedUser", deletedUser);
          res.status(200).json({
            message: "Пользователь успешно удален",
          });
        } else {
          console.error('"Не удалось удалить пользователя"');
          return res
            .status(400)
            .json({ message: "Не удалось удалить пользователя" });
        }
      } else {
        console.log("Отсутствует идентификатор пользователя");
        return res
          .status(400)
          .json({ message: "Отсутствует идентификатор пользователя" });
      }
    } catch (err) {
      console.log(`deleteUser error :${err}`);
      res.status(500).json({ message: "Не удалось удалить пользователя" });
    }
  }
  async addUser(req: Request, res: Response) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 6);
      const role = req.body.roles || ["USER"];

      const newUser = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        roles: role,
        password: hashedPassword,
      });
      res.status(201).json({
        message: "Пользователь успешно создан",
        userName: newUser.userName,
      });
    } catch (err) {
      console.log(`addUser error :${err}`);
      res
        .status(500)
        .json({ message: "Не удалось создать нового пользователя" });
    }
  }
}

export default new usersController();
