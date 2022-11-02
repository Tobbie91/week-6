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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotels = exports.getSingleHotel = exports.getHotels = exports.createHotels = void 0;
const uuid_1 = require("uuid");
const hotel_1 = require("../model/hotel");
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
function createHotels(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        try {
            const userId = req.user.id;
            const validationResult = utils_1.createHotelSchema.validate(req.body, utils_1.options);
            if (validationResult.error) {
                return res.status(400).json({
                    Error: validationResult.error.details[0].message
                });
            }
            const record = yield hotel_1.hotelInstance.create(Object.assign(Object.assign({ id }, req.body), { userId }));
            // res.status(201).json({
            //     msg: "you have sucessfully created a hotel listing",
            //     record
            // })
            res.redirect("/users/listing1");
        }
        catch (err) {
            res.status(500).json({
                msg: 'failed to create',
                route: '/create'
            });
        }
    });
}
exports.createHotels = createHotels;
function getHotels(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
            const offset = (_b = req.query) === null || _b === void 0 ? void 0 : _b.offset;
            //const record = await hotelInstance.findAll({where: {}})
            const record = yield hotel_1.hotelInstance.findAndCountAll({ limit, offset, include: [{
                        model: user_1.UserInstance,
                        attributes: ['id', 'fullName', 'email', 'phoneNumber'],
                        as: 'user'
                    }]
            });
            res.status(200).json({
                msg: "All Hotels fetched successfully",
                count: record.count,
                record: record.rows
            });
        }
        catch (error) {
            res.status(500).json({
                msg: "failed to fetch hotels",
                route: "/read"
            });
        }
    });
}
exports.getHotels = getHotels;
function getSingleHotel(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const record = yield hotel_1.hotelInstance.findOne({ where: { id } });
            return res.status(200).json({
                msg: "Single Hotel Information successfully fetched",
                record
            });
        }
        catch (error) {
            res.status(500);
            res.json({
                msg: "Failed to read single hotel information",
                route: "/read/:id"
            });
        }
    });
}
exports.getSingleHotel = getSingleHotel;
function updateHotels(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { description, image, address, price, numOfBeds, numOfBaths, ratings } = req.body;
            const validationResult = utils_1.updateHotelSchema.validate(req.body, utils_1.options);
            if (validationResult.error) {
                return res.status(400).json({
                    Error: validationResult.error.details[0].message
                });
            }
            const record = yield hotel_1.hotelInstance.findOne({ where: { id } });
            if (!record) {
                return res.status(404).json({
                    Error: "Cannot find existing hotel"
                });
            }
            const updateRecord = yield (record === null || record === void 0 ? void 0 : record.update({
                description: description,
                image: image,
                address: address,
                price: price,
                numOfBeds: numOfBeds,
                numOfBaths: numOfBaths,
                ratings: ratings,
            }));
            res.redirect("/users/listing1");
            // res.status(200).json({
            //     msg: "You have successfully updated your hotel",
            //     updateRecord
            // })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "failed to update",
                route: "/update/:id"
            });
        }
    });
}
exports.updateHotels = updateHotels;
function deleteHotel(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const record = yield hotel_1.hotelInstance.findOne({ where: { id } });
            if (!record) {
                return res.status(404).json({
                    msg: "Cannot find hotel"
                });
            }
            const deleteRecord = yield record.destroy();
            // return res.status(200).json({
            //     msg: "Hotel deleted successfully",
            //     deleteRecord
            // })
            res.render("listing1");
        }
        catch (error) {
            res.status(500).json({
                msg: "failed to delete",
                route: "/delete/:id"
            });
        }
    });
}
exports.deleteHotel = deleteHotel;
