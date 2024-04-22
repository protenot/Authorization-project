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
const Role_1 = __importDefault(require("../models/Role"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../config/jwt.config");
const generateAccessToken = (id, userName, email, roles) => {
    const payload = {
        id,
        userName,
        email,
        roles,
    };
    return jsonwebtoken_1.default.sign(payload, jwt_config_1.secret, { expiresIn: "24h" });
};
class authController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res
                        .status(400)
                        .json({ message: `Ошибка при регистрации, ${JSON.stringify(errors)}` });
                }
                const { userName, email, password } = req.body;
                const candidate = yield User_1.default.findOne({ userName });
                const candidateEmail = yield User_1.default.findOne({ email });
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
                const hashedPassword = yield bcrypt_1.default.hash(password, 6);
                const userRole = yield Role_1.default.findOne({ value: "USER" });
                const newUser = new User_1.default({
                    userName,
                    email,
                    password: hashedPassword,
                    roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value],
                });
                yield newUser.save();
                return res
                    .status(200)
                    .json({ message: "Пользователь был успешно зарегистрирован" });
            }
            catch (err) {
                console.log(`Registration error :${err}`);
                return res.status(400).json({ message: "Ошибочка при регистрации" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = (yield User_1.default.findOne({ email }));
                console.log('user', user);
                if (!user) {
                    return res
                        .status(400)
                        .json({ message: `Пользователь с адресом ${email} не найден` });
                }
                const validPassword = bcrypt_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password);
                console.log('password', password);
                console.log('user.password', user.password);
                if (!validPassword) {
                    return res.status(400).json({ message: `Введен неверный пароль` });
                }
                const token = generateAccessToken(user._id, user.userName, user.email, user.roles);
                return res.status(200).json({
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    roles: user.roles,
                    token,
                });
            }
            catch (err) {
                console.log(`Login error :${err}`);
                return res.status(400).json({ message: "Ошибка входа" });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield User_1.default.find();
                return res.json(allUsers);
            }
            catch (err) {
                console.log(`getUsers error :${err}`);
                return res.status(400).json({ message: "Ошибка при получении пользователей" });
            }
        });
    }
    currentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json(req.user);
        });
    }
}
exports.default = new authController();
