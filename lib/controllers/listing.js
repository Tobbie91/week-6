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
exports.getListingUser = exports.rateListing = exports.deleteListing = exports.updateListing = exports.getListingById = exports.getListings = exports.createListing = void 0;
const listing_1 = require("../services/listing");
const listing_2 = require("../utils/listing");
const msgTypes_1 = require("../utils/validation/msgTypes");
const env_1 = require("../config/env");
function createListing(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = listing_2.validateListingSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const filepath = req.file.path.split("public")[1];
            const listing = yield listing_1.ListingService.createListing(Object.assign(Object.assign({}, req.body), { image: `${env_1.FILE_HOST}${filepath}`, authorId: req.user.id }));
            res.status(201).json({ message: msgTypes_1.MSG_TYPES.LISTING_CREATED, listing });
        }
        catch (error) {
            res.status(500).json({ message: "failed to create" });
        }
    });
}
exports.createListing = createListing;
;
function getListings(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listings = yield listing_1.ListingService.getListings();
            res.status(200).json({ message: msgTypes_1.MSG_TYPES.LISTINGS_FOUND, listings });
        }
        catch (error) {
            res.status(500).json({ message: "failed to fetch listings" });
        }
    });
}
exports.getListings = getListings;
;
function getListingById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listing = yield listing_1.ListingService.getListingById(req.params.id);
            res.status(200).json({ message: msgTypes_1.MSG_TYPES.LISTING_FOUND, listing });
        }
        catch (error) {
            res.status(500).json({ message: "failed to fetch single listing" });
        }
    });
}
exports.getListingById = getListingById;
;
function updateListing(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listing = yield listing_1.ListingService.updateListing(req.params.id, Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
            res.status(200).json({ message: msgTypes_1.MSG_TYPES.LISTING_UPDATED, listing });
        }
        catch (error) {
            res.status(500).json({ message: "cannot find existing listing" });
        }
    });
}
exports.updateListing = updateListing;
;
function deleteListing(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield listing_1.ListingService.deleteListing(req.params.id, req.user.id);
            res.status(200).json({ message: msgTypes_1.MSG_TYPES.LISTING_DELETED });
        }
        catch (error) {
            res.status(500).json({ message: "failed to delete" });
        }
    });
}
exports.deleteListing = deleteListing;
;
function rateListing(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listing = yield listing_1.ListingService.rateListing(req.params.id, req.body);
            res.status(200).json({ message: msgTypes_1.MSG_TYPES.LISTING_RATED, listing });
        }
        catch (error) {
            res.status(500).json({ message: "failed to rate listing" });
        }
    });
}
exports.rateListing = rateListing;
;
function getListingUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listing = yield listing_1.ListingService.getListingByUser(req.params.id, req.body);
            res.status(200).json({ message: msgTypes_1.MSG_TYPES.LISTING_FOUND, listing });
        }
        catch (error) {
            res.status(500).json({ message: "failed to fetch" });
        }
    });
}
exports.getListingUser = getListingUser;
;
