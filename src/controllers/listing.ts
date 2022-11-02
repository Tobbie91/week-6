import {Request, Response, NextFunction} from "express";
import {v4 as uuidv4} from 'uuid';
import ListingService  from "../services/listing";
import { validateListingSchema } from "../utils/listing";
import FILE_HOST from "../config/env"

export async function createListing(req:Request | any, res: Response, next:NextFunction){
    try {
        const { error } = validateListingSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
    
        const filepath = req.file.path.split("public")[1];
        const listing = await ListingService.createListing({...req.body, image: `${FILE_HOST}${filepath}`,
        authorId: req.user.id
    });
     //res.status(201).json({message: MSG_TYPES.LISTING_CREATED, listing });
    }
        catch ( error) {
            res.status( 500).json({message: "failed to create" });
        }
};

export async function getListings(req:Request, res:Response, next:NextFunction){
    try {
        const listings = await ListingService.getListings();
        res.status(200).json({message: "All Listings fetched successfully", listings });
        
    }
        catch ( error) {
            res.status(500).json({message: "failed to fetch listings" });
        }
};

export async function getListingById(req:Request, res:Response, next: NextFunction){
    try {
        const listing = await ListingService.getListingById(req.params.id)
        res.status(200).json({message: "Single Hotel Information successfully fetched", listing })
    }
        catch ( error) {
            res.status(500).json({message: "failed to fetch single listing" });
        }
};

export async function updateListing(req:Request, res:Response, next:NextFunction){
    try {
        //const {id} = req.params
       // const{description, image, address, price, numOfBeds, numOfBaths,ratings} = req.body
        const listing = await ListingService.updateListing(req.params.id, {
           ...req.body,
        });
        res.status(200).json({message: "You have successfully updated your hotel", listing })
    }
        catch ( error) {
            res.status(500).json({message: "cannot find existing listing"});
        }
};

export async function deleteListing(req:Request, res:Response, next:NextFunction){
    try {
        await ListingService.deleteListing(req.params.id);
        //res.status(200).json({message: MSG_TYPES.LISTING_DELETED})
    }
        catch ( error) {
            res.status(500).json({message: "failed to delete"});
        }
};

export async function rateListing(req:Request, res:Response, next:NextFunction){
    try {
       const listing =  await ListingService.rateListing(req.params.id,req.body)
        //res.status(200).json({message: MSG_TYPES.LISTING_RATED, listing });
    }
        catch ( error) {
            res.status(500).json({message: "failed to rate listing"});
        }
};

export async function getListingUser(req:Request, res:Response, next:NextFunction){
    try {
       const listing =  await ListingService.getListingByUser(req.params.id,req.body)
       // res.status(200).json({message: MSG_TYPES.LISTING_FOUND, listing });
    }
        catch ( error) {
            res.status(500).json({message: "failed to fetch"});
        }
};