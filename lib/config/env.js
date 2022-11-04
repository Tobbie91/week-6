"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    FILE_HOST: process.env.NODE_ENV === "development"
        ? "http://localhost:2022"
        : "http://localhost:2022"
};
