import fs from "fs";
import path from "path";
import db from "../models";
import HttpError from "../utils/httpError";
import envsecret from "../config/env"

export const createListing = async (data:any) =>{
const {
    description, 
    image, 
    address,
    price, 
    numOfBeds, 
    numOfBaths,
    authorId,
    // rating,
} = data;
const listing = await db.Listing.create({
    description, 
    image, 
    address,
    price, 
    numOfBeds, 
    numOfBaths,
    authorId,
    // rating,

})
return listing;
}

export const getListings = async ()=> {
    const listings = await db.Listing.findAll()
    return listings
}

export const getListingById = async(id:Number) => {
    const listing = await db.Listing.findByPk(id)
    if(!listing){
        throw new HttpError("Hotel not found", 404)
    }
    return listing
}

export const updateListing = async(id:Number, data:any)=> {
    const listing = await db.Listing.findByPk(id)
    if(!listing){
        throw new HttpError("Hotel not found", 404)
    }
    if(listing.authorId !== data.userId){
        throw new HttpError("You are not authorized to update this listing", 404)
    }
    const {
        description, 
        image, 
        address,
        price, 
        numOfBeds, 
        numOfBaths,
        authorId,
        rating,   
    }= data
    listing.description= description,
    listing.image= image, 
    listing.address = address, 
    listing.price = price, 
    listing.numOfBeds = numOfBeds,
    listing.numOfBaths= numOfBaths,
    listing.rating = rating,
    
    await listing.save();
    return listing;
}

export const deleteListing = async (id:Number, userId:string) => {
    const listing = await db.Listing.findByPk(id)
    if(!listing){
        throw new HttpError("Hotel not found", 404)
    }
    if(listing.authorId !== userId){
        throw new HttpError("You are not authorized to delete this listing", 404)
    }
    const imagePath = path.join(
    __dirname, 
    "../public/", 
 listing.image.split(`${envsecret.FILE_HOST}`)[1])

    fs.unlinkSync(imagePath);
    await listing.destroy();
    return listing;
}

export const rateListing = async (id:Number, data:any) => {
    const listing = await db.Listing.findByPk(id);
    if(!listing) {
        throw new HttpError("Listing not found", 404);
    }
    const { rating, } = data;
    listing.rating = (rating + listing.rating) / (listing.numReviews+1)
    if(listing.numReviews){
        listing.numReviews += 1
    }else{
        listing.numReviews = 1
    }
    await listing.save();
    return listing;
}

export const getListingsByUser = async (id:Number) => {
    const listings = await db.Listing.findAll({
        where: {
            authorId: id,
        },
    })
    return listings;
}
