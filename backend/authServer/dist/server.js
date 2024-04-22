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
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const PORT = process.env.PORT || 5000;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/auth", authRouter_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://protenot:Pr0ten0t@cluster13.dex6u7b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster13`);
        exports.app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
start();
