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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const user_1 = require("../model/user");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.cookies.auth;
        //console.log(req.cookies)
        try {
            if (!authorization) {
                res.status(401).send({
                    Error: 'Kindly sign in as a user'
                });
            }
            const token = authorization;
            let verified = jsonwebtoken_1.default.verify(token, secret);
            if (!verified) {
                return res.status(401).json({
                    Error: 'User not verified, you cant access this route'
                });
            }
            const { id } = verified;
            const user = yield user_1.UserInstance.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({
                    Error: 'User not verified'
                });
            }
            req.user = verified;
            next();
        }
        catch (error) {
            res.status(403).json({
                Error: 'User not logged in'
            });
        }
    });
}
exports.auth = auth;
