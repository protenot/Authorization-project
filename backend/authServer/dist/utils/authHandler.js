"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../config/jwt.config");
const authHandler = function (req, res, next) {
    var _a;
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "The user is not authorized" });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, jwt_config_1.secret);
        req.user = decodedData;
        next();
    }
    catch (err) {
        console.log("authHandler error", err);
        return res.status(403).json({ message: "The user is not authorized" });
    }
};
exports.authHandler = authHandler;
