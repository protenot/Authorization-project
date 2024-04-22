"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_validator_1 = require("express-validator");
const authHandler_1 = require("../utils/authHandler");
const roleHandler_1 = require("../utils/roleHandler");
const authRouter = (0, express_1.Router)();
authRouter.post("/registration", [
    (0, express_validator_1.check)("userName", "The user name cannot be empty").notEmpty(),
    (0, express_validator_1.check)("email").isEmail(),
    (0, express_validator_1.check)("password").isLength({ min: 6, max: 25 }),
], auth_controller_1.default.registration);
authRouter.post("/login", auth_controller_1.default.login);
authRouter.get("/users", (0, roleHandler_1.roleHandler)(["ADMIN"]), auth_controller_1.default.getUsers);
authRouter.get("/currentUser", authHandler_1.authHandler, auth_controller_1.default.currentUser);
exports.default = authRouter;
