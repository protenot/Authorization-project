"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class usersController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield User_1.default.find();
                res.status(200).json(allUsers);
            }
            catch (err) {
                console.log(`getUsers error :${err}`);
                res.status(400).json({ message: "Не удалось загрузить пользователей" });
            }
        });
    }
    getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield User_1.default.findById(id);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(400);
                    console.error("Не удалось получить  данные пользователя");
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Не удалось получить  данные пользователя" });
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = Object.assign({}, req.body);
                const id = req.params.id;
                const editedUser = yield User_1.default.findByIdAndUpdate(id, { $set: data });
                if (editedUser) {
                    res
                        .status(200)
                        .json({ message: `Пользователь ${data.userName} успешно обновлен` });
                }
                else {
                    res.status(404).json({ message: "Пользователь не найден" });
                }
            }
            catch (err) {
                console.log(`editUser error :${err}`);
                res
                    .status(500)
                    .json({ message: "Не удалось отредактировать данные пользователя" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const deletedUser = yield User_1.default.deleteOne({ _id: id });
                    if (deletedUser.deletedCount === 1) {
                        console.log("deletedUser", deletedUser);
                        res.status(200).json({
                            message: "Пользователь успешно удален",
                        });
                    }
                    else {
                        console.error('"Не удалось удалить пользователя"');
                        return res
                            .status(400)
                            .json({ message: "Не удалось удалить пользователя" });
                    }
                }
                else {
                    console.log("Отсутствует идентификатор пользователя");
                    return res
                        .status(400)
                        .json({ message: "Отсутствует идентификатор пользователя" });
                }
            }
            catch (err) {
                console.log(`deleteUser error :${err}`);
                res.status(500).json({ message: "Не удалось удалить пользователя" });
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 6);
                const role = req.body.roles || ["USER"];
                const newUser = yield User_1.default.create({
                    userName: req.body.userName,
                    email: req.body.email,
                    roles: role,
                    password: hashedPassword,
                });
                res.status(201).json({
                    message: "Пользователь успешно создан",
                    userName: newUser.userName,
                });
            }
            catch (err) {
                console.log(`addUser error :${err}`);
                res
                    .status(500)
                    .json({ message: "Не удалось создать нового пользователя" });
            }
        });
    }
}
exports.default = new usersController();
