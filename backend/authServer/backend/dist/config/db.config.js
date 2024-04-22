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
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Role_1 = __importDefault(require("../models/Role"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/auth");
        checkingRoles();
        checkingUsers();
    }
    catch (err) {
        console.log(err);
    }
});
exports.dbConnect = dbConnect;
const checkingRoles = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const rolesCount = yield Role_1.default.countDocuments();
        if (rolesCount === 0) {
            yield Role_1.default.create({ value: "ADMIN" });
            yield Role_1.default.create({ value: "USER" });
            console.log("Roles are added to DB");
        }
        else {
            console.log("Roles are existed in DB");
        }
    });
};
const checkingUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const usersCount = yield User_1.default.countDocuments();
        if (usersCount === 0) {
            const hashedUserPassword = yield bcrypt_1.default.hash('user11', 10);
            const hashedAdminPassword = yield bcrypt_1.default.hash('admin1', 10);
            yield User_1.default.create({
                userName: "User",
                email: "user@test.test",
                roles: ["USER"],
                password: hashedUserPassword,
            });
            yield User_1.default.create({
                userName: "Admin",
                email: "admin@test.test",
                roles: ["ADMIN"],
                password: hashedAdminPassword,
            });
            console.log("Users are added to DB");
        }
        else {
            console.log("Users are existed in DB");
        }
    });
};
