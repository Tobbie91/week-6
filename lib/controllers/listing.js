"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getListingsByUser = exports.rateListing = exports.deleteListing = exports.updateListing = exports.getListingByIdForEdit = exports.getListingById = exports.getListings = exports.getListingsForDasboard = exports.createListing = void 0;
const ListingService = __importStar(require("../services/listing"));
const listing_1 = __importDefault(require("../utils/listing"));
const MSG_TYPES = require("../utils/validation/msgTypes");
const env_1 = __importDefault(require("../config/env"));
const createListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        (_a = req.body) === null || _a === void 0 ? true : delete _a.image;
        const { error } = (0, listing_1.default)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const filepath = req.file.path.split("public")[1];
        const listing = yield ListingService.createListing(Object.assign(Object.assign({}, req.body), { image: `${env_1.default.FILE_HOST}${filepath}`, authorId: (_b = res.locals) === null || _b === void 0 ? void 0 : _b.user.id }));
        res.status(201).json({ message: MSG_TYPES.LISTING_CREATED, listing });
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.createListing = createListing;
const getListingsForDasboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const listings = yield ListingService.getListingsByUser((_d = (_c = res.locals) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id);
        res.status(200).render('pages/dashboard', { listings });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getListingsForDasboard = getListingsForDasboard;
const getListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listings = yield ListingService.getListings();
        res.status(200).json({ message: MSG_TYPES.LISTINGS_FOUND, listings });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getListings = getListings;
const getListingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield ListingService.getListingById(req.params.id);
        res.status(200).render('show', { section: listing });
        // res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, listing });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getListingById = getListingById;
const getListingByIdForEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield ListingService.getListingById(+req.params.id);
        res.status(200).render('pages/edit', { listing });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getListingByIdForEdit = getListingByIdForEdit;
const updateListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, listing_1.default)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const filepath = req.file.path.split("public")[1];
        const listing = yield ListingService.updateListing(req.params.id, Object.assign(Object.assign({}, req.body), { userId: res.locals.user.id, image: `${env_1.default.FILE_HOST}${filepath}` }));
        res.status(301).redirect('/dashboard');
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.updateListing = updateListing;
const deleteListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const listing = yield ListingService.deleteListing(req.params.id, (_f = (_e = res.locals) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.id);
        res.status(301).redirect('/dashboard');
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.deleteListing = deleteListing;
const rateListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield ListingService.rateListing(req.params.id, res.body);
        res.status(200).json({ message: MSG_TYPES.LISTING_RATED, listing });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.rateListing = rateListing;
const getListingsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listings = yield ListingService.getListingsByUser(req.user.id);
        res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, listings });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getListingsByUser = getListingsByUser;
