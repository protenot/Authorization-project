"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
require("dotenv/config");
exports.secret = `${process.env.SECRET_JWT}`;