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
const users_1 = __importDefault(require("../services/users"));
const usersValidation_1 = require("../utils/usersValidation");
const msgTypes_1 = require("../utils/validation/msgTypes");
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateUser)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield users_1.default.signup(req.body);
        res.status(201).json({ message: msgTypes_1.MSG_TYPES.ACCOUNT_CREATED, user });
    }
    catch (error) {
        res.status(500).json({ message: "Email has been used, please change email" });
        console.log(error);
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateLogin)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield users_1.default.login(req.body);
        res.status(200).json({ message: msgTypes_1.MSG_TYPES.LOGGED_IN, user });
    }
    catch (error) {
        res.status(500).json({ message: "failed to login" });
    }
});
