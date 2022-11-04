import * as ListingService from "../services/listing";
import validateListing from "../utils/listing";
const MSG_TYPES = require("../utils/validation/msgTypes");
import envSecret from "../config/env";

export const createListing = async (req: any, res: any) => {
	try {
		const { error } = validateListing(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		console.log(req.body);
		console.log(req.file);
		const filepath = req.file.path.split("public")[1];
		const listing = await ListingService.createListing({
			...req.body,
			image: `${envSecret.FILE_HOST}${filepath}`,
			authorId: req.user.id,
		});
		res.status(201).json({ message: MSG_TYPES.LISTING_CREATED, listing });
	} catch (error: any) {
		console.log(error);
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const getListings = async (req: any, res: any) => {
	try {
		const listings = await ListingService.getListings();
		res.status(200).json({ message: MSG_TYPES.LISTINGS_FOUND, listings });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const getListingById = async (req: any, res: any) => {
	try {
		const listing = await ListingService.getListingById(req.params.id);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, listing });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const updateListing = async (req: any, res: any) => {
	try {
		const { error } = validateListing(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		console.log(req.body);
		console.log(req.file);
		const filepath = req.file.path.split("public")[1];
		const listing = await ListingService.updateListing(req.params.id, {
			...req.body,
			userId: req.user.id,
			image: `${envSecret.FILE_HOST}${filepath}`,
		});
		res.status(200).json({ message: MSG_TYPES.Listing_UPDATED, listing });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const deleteListing = async (req: any, res: any) => {
	try {
		console.log(req.params.id, req.user.id);
		const listing = await ListingService.deleteListing(
			req.params.id,
			req.user.id
		);
		res.status(200).json({ message: MSG_TYPES.LISTING_DELETED, listing });
	} catch (error: any) {
		console.log(error);
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const rateListing = async (req: any, res: any) => {
	try {
		const listing = await ListingService.rateListing(req.params.id, res.body);
		res.status(200).json({ message: MSG_TYPES.LISTING_RATED,listing });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const getListingsByUser = async (req: any, res: any) => {
	try {
		const listings = await ListingService.getListingsByUser(
			req.user.id
		);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, listings });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

//export {createProduct,  getProducts, getProductById, updateProduct, deleteProduct, rateProduct, getProductsByUser }
