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
exports.getListingsByUser = exports.rateListing = exports.deleteListing = exports.updateListing = exports.getListingById = exports.getListings = exports.createListing = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const models_1 = __importDefault(require("../models"));
const httpError_1 = __importDefault(require("../utils/httpError"));
const env_1 = __importDefault(require("../config/env"));
const createListing = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, image, address, price, numOfBeds, numOfBaths, authorId,
    // rating,
     } = data;
    const listing = yield models_1.default.Listing.create({
        description,
        image,
        address,
        price,
        numOfBeds,
        numOfBaths,
        authorId,
        // rating,
    });
    return listing;
});
exports.createListing = createListing;
const getListings = () => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield models_1.default.Listing.findAll();
    return listings;
});
exports.getListings = getListings;
const getListingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield models_1.default.Listing.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Hotel not found", 404);
    }
    return listing;
});
exports.getListingById = getListingById;
const updateListing = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield models_1.default.Listing.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Hotel not found", 404);
    }
    if (listing.authorId !== data.userId) {
        throw new httpError_1.default("You are not authorized to update this listing", 404);
    }
    const { description, image, address, price, numOfBeds, numOfBaths, authorId, rating, } = data;
    listing.description = description,
        listing.image = image,
        listing.address = address,
        listing.price = price,
        listing.numOfBeds = numOfBeds,
        listing.numOfBaths = numOfBaths,
        listing.rating = rating,
        yield listing.save();
    return listing;
});
exports.updateListing = updateListing;
const deleteListing = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield models_1.default.Product.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Hotel not found", 404);
    }
    if (listing.authorId !== userId) {
        throw new httpError_1.default("You are not authorized to delete this listing", 404);
    }
    const imagePath = path_1.default.join(__dirname, "../public/", listing.image.split(`${env_1.default.FILE_HOST}`)[1]);
    fs_1.default.unlinkSync(imagePath);
    yield listing.destroy();
    return listing;
});
exports.deleteListing = deleteListing;
const rateListing = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield models_1.default.Listing.findByPk(id);
    if (!listing) {
        throw new httpError_1.default("Listing not found", 404);
    }
    const { rating, } = data;
    listing.rating = (rating + listing.rating);
    // if(product.numReviews){
    //     product.numReviews += 1
    // }else{
    //     product.numReviews = 1
    // }
    yield listing.save();
    return listing;
});
exports.rateListing = rateListing;
const getListingsByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield models_1.default.Listing.findAll({
        where: {
            authorId: id,
        },
    });
    return listings;
});
exports.getListingsByUser = getListingsByUser;
//export default {createProduct,  getProducts, getProductById, updateProduct, deleteProduct, rateProduct,getProductsByUser }
