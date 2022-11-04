"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateListing = (data) => {
    const schema = joi_1.default.object({
        description: joi_1.default.string().min(3).max(255).required(),
        address: joi_1.default.string().min(3).max(255).required(),
        price: joi_1.default.number().min(0).max(1000000).required(),
        numOfBeds: joi_1.default.number().min(0).max(5).required(),
        numOfBaths: joi_1.default.number().min(0).max(5).required()
    });
    return schema.validate(data);
};
exports.default = validateListing;
