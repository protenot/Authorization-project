"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { authHandler } from "../utils/authHandler";
const roleHandler_1 = require("../utils/roleHandler");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", (0, roleHandler_1.roleHandler)(["ADMIN"]), users_controller_1.default.getUsers);
usersRouter.get("/:id", (0, roleHandler_1.roleHandler)(["ADMIN"]), users_controller_1.default.getOneUser);
usersRouter.post("/add", (0, roleHandler_1.roleHandler)(["ADMIN"]), users_controller_1.default.addUser);
usersRouter.delete("/delete/:id", (0, roleHandler_1.roleHandler)(["ADMIN"]), users_controller_1.default.deleteUser);
usersRouter.put("/edit/:id", (0, roleHandler_1.roleHandler)(["ADMIN"]), users_controller_1.default.editUser);
exports.default = usersRouter;
