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
exports.auth = void 0;
const jsonWebToken_1 = __importDefault(require("jsonWebToken"));
const models_1 = require("../models");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            try {
                const token = req.headers.authorization.split(" ")[1];
                let verified = jsonWebToken_1.default.verify(token, secret);
                const decoded = jsonWebToken_1.default.verify(token, process.env.JWT_SECRET);
                console.log("decoded", decoded);
                const { id } = verified;
                const user = yield models_1.User.findOne({ where: { id } });
                req.user = user;
                return next();
            }
            catch (error) {
                res.status(400).send("Invalid token");
            }
        }
        else {
            return res.status(404).send("Bearer token is missing");
        }
    });
}
exports.auth = auth;
exports = verifyToken;
