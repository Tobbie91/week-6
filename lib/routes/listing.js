"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const listing_1 = __importDefault(require("../controllers/listing"));
const multer_1 = require("../middlewares/multer");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.post("/", auth_1.default, multer_1.upload.single("image"), multer_1.fileSizeLimitErrorHandler, listing_1.default.createListing);
router.get("/", listing_1.default.getListings);
router.get("/:id", listing_1.default.getListingById);
router.put("/:id", auth_1.default, multer_1.upload.single("image"), multer_1.fileSizeLimitErrorHandler, listing_1.default.updateListing);
router.delete("/:id", listing_1.default.deleteListings);
//router.post("/:id/reviews", ListingController.rateListing);
//router.get("/:user/listings", verifyToken, ListingController.getListingsByUser)
exports.default = router;
