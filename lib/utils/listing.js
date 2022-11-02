"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateListingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateListingSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required().min(3).max(255),
    address: joi_1.default.string().min(3).max(255).required(),
    price: joi_1.default.number().min(0).max(1000000).required(),
    numOfBeds: joi_1.default.number().min(0).max(1000000).required(),
    rating: joi_1.default.number().min(0).max(5).required(),
    numOfBaths: joi_1.default.number().min(0).max(1000000).required(),
});
