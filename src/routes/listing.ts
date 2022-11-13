import express from "express";
const router = express.Router();

import * as ListingController from "../controllers/listing";
const { upload, fileSizeLimitErrorHandler } = require("../middlewares/multer");
import {verifyToken} from"../middlewares/auth";

router.post(
	"/",
	verifyToken,
	upload?.single("image"),
	fileSizeLimitErrorHandler,
	ListingController.createListing
);

router.get("/", ListingController.getListings);

router.get("/:id", ListingController.getListingById);

router.put(
	"/:id",
	verifyToken,
	upload?.single("image"),
	fileSizeLimitErrorHandler,
	ListingController.updateListing
);

router.delete("/:id", verifyToken, ListingController.deleteListing);

router.post("/:id/reviews", ListingController.rateListing);

router.get("/:user/listings", verifyToken, ListingController.getListingsByUser);

export default router;

// function single(
// 	arg0: string
// ): import("express-serve-static-core").RequestHandler<
// 	{},
// 	any,
// 	any,
// 	import("qs").ParsedQs,
// 	Record<string, any>
// > {
// 	throw new Error("Function not implemented.");
// }
