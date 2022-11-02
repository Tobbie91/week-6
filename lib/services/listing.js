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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
const listing_1 = require("../models/listing");
const httpError_1 = __importDefault(require("../utils/httpError"));
exports.createListing = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, image, address, price, numOfBeds, numOfBaths, id, authorId, } = data;
    const listing = yield listing_1.Listing.create({
        description,
        image,
        address,
        price,
        numOfBeds,
        numOfBaths,
        id,
        authorId,
    });
    return listing;
});
exports.getListings = () => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield listing_1.Listing.findAll();
    return listings;
});
exports.getListingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_1.Listing.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Listing not found", 404);
    }
    return listing;
});
exports.updateListing = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_1.Listing.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Listing not found", 404);
    }
    if (listing.authorId !== userId) {
        throw new httpError_1.default("You are Not authorized to update this listing", 404);
    }
    const { description, image, address, price, numOfBeds, numOfBaths, authorId, } = data;
    listing.description = description,
        listing.image = image,
        listing.address = address,
        listing.price = price,
        listing.numOfBeds = numOfBeds,
        listing.numOfBaths = numOfBaths,
        //listing.rating = rating,
        //listing.authorId = authorId
        yield listing.save();
    return listing;
});
exports.deleteListing = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_1.Listing.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Listing not found", 404);
    }
    if (listing.authorId !== userId) {
        throw new httpError_1.default("You are Not authorized to delete this listing", 404);
    }
    const imagePath = path_1.default.join(__dirname, "../public/", listing.image.split(`${env_1.FILE_HOST}`)[1]);
    fs_1.default.unlinkSync(imagePath);
    yield listing.destroy();
    return listing;
});
exports.rateListing = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_1.Listing.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Listing not found", 404);
    }
    const { rating, } = data;
    listing.rating = (rating + listing.rating);
    yield listing.save();
    return listing;
});
//fetch only listing created by user
exports.getListingByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_1.Listing.findAll({
        where: {
            authorId: id,
        },
    });
    return listing;
});
exports.default = listing_1.Listing;
