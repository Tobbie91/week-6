import fs from "fs";
import path from "path";
import { FILE_HOST } from "../config/env";
import {Listing} from "../models";
import HttpError from "../utils/httpError"

exports.createListing = async (data) =>{
const {
    description, 
    image, 
    address, 
    price, 
    numOfBeds, 
    numOfBaths,
    id,
    authorId,
} = data;
const listing = await Listing.create({
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
}

exports.getListings = async () =>{
    const listings = await Listing.findAll()
    return listings;
}

exports.getListingById = async(id) => {
    const listing = await Listing.findByPk(id)
    if(!listing){
        throw new HttpError("Listing not found", 404)
    }
    return listing;
}

exports.updateListing = async(id, data)=>{
    const listing = await Listing.findByPk(id)
    if(!listing){
        throw new HttpError("Listing not found", 404)
    }
    if(listing.authorId !== userId){
        throw new HttpError("You are Not authorized to update this listing", 404)
    } 
    const {
        description, 
        image, 
        address, 
        price, 
        numOfBeds, 
        numOfBaths,
        id,
        authorId,
        
    } = data;
    listing.description = description,
    listing.image = image,
    listing.address = address,
    listing.price = price,
    listing.numOfBeds = numOfBeds,
    listing.numOfBaths = numOfBaths,
    //listing.rating = rating,
    //listing.authorId = authorId
    await listing.save();
    return listing;
}

exports.deleteListing = async (id, userId) => {
    const listing = await Listing.findByPk(id)
    if(!listing){
        throw new HttpError("Listing not found", 404)
    }   
    if(listing.authorId !== userId){
        throw new HttpError("You are Not authorized to delete this listing", 404)
    }   
const imagePath = path.join(
    __dirname, 
    "../public/", 
    listing.image.split(`${FILE_HOST}`)[1]
    );

    fs.unlinkSync(imagePath);
    await listing.destroy();
    return listing;
}
exports.rateListing = async (id, data) => {
    const listing = await Listing.findByPk(id);
    if(!listing) {
        throw new HttpError("Listing not found", 404);
    }
    const { rating, } = data;
    listing.rating = (rating + listing.rating);
    await listing.save();
    return listing;
}

//fetch only listing created by user
exports.getListingByUser = async (id) =>{
    const listing = await Listing.findAll({
        where: {
            authorId: id,
        },
    })
    return listings;
}
export default Listing;