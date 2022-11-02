"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginSchema = exports.validateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// const userSchema = Joi.object({
//     fullname: Joi.string().required(),
//     phoneNumber: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
// });
// const validateAdmin = (admin) =>{
//     const Schema = Joi.object().keys({
//         username: Joi.string().max(30).required(),
//         password: Joi.string().max(30).required(),
//     });
//     return Schema.validate(admin)
//};
exports.validateUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().required().min(3).max(50),
    phoneNumber: joi_1.default.string().required().min(11).max(13),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    confirm_password: joi_1.default.ref("password"),
}).with("password", "confirm_password");
exports.validateLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
