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
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
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
                    return res.status(400).json({ message: "Registration error", errors });
                }
                const { userName, email, password } = req.body;
                const candidate = yield User_1.default.findOne({ userName });
                const candidateEmail = yield User_1.default.findOne({ email });
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
                    .json({ message: "The user has been successfully registered" });
            }
            catch (err) {
                console.log(`Registration error :${err}`);
                res.status(400).json({ message: "Registration error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, password } = req.body;
                const user = (yield User_1.default.findOne({ userName }));
                if (!user) {
                    res.send(400).json({ message: `User ${userName} has not been found` });
                }
                const validPassword = bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
                if (!validPassword) {
                    res.send(400).json({ message: `The wrong password was entered` });
                }
                const token = generateAccessToken(user._id, user.roles);
                return res.json({ token });
            }
            catch (err) {
                console.log(`Login error :${err}`);
                res.status(400).json({ message: "Login error" });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield User_1.default.find();
                res.json(allUsers);
            }
            catch (err) {
                console.log(`getUsers error :${err}`);
                res.status(400).json({ message: "getUsers error" });
            }
        });
    }
}
exports.default = new authController();
