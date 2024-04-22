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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const db_config_1 = require("./config/db.config");
const cors_1 = __importDefault(require("cors"));
const usersRouter_1 = __importDefault(require("./router/usersRouter"));
const PORT = process.env.PORT || 5000;
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use("/users", usersRouter_1.default);
exports.app.use("/auth", authRouter_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, db_config_1.dbConnect)();
        exports.app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
start();
