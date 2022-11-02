import express from 'express';
const router = express.Router();

import ListingController from "../controllers/listing";
import { upload, fileSizeLimitErrorHandler } from "../middlewares/multer";
import verifyToken from "../middlewares/auth";

router.post(
    "/", 
    verifyToken,
    upload.single("image"),
    fileSizeLimitErrorHandler,
    ListingController.createListing
);

router.get("/", ListingController.getListings);

router.get("/:id", ListingController.getListingById);

router.put( "/:id", verifyToken, upload.single("image"), fileSizeLimitErrorHandler,ListingController.updateListing);

router.delete("/:id", ListingController.deleteListings);

//router.post("/:id/reviews", ListingController.rateListing);

//router.get("/:user/listings", verifyToken, ListingController.getListingsByUser)

export default router;
