import Joi from "joi";

export const validateListingSchema = Joi.object().keys({
            description: Joi.string().required().min(3).max(255),
            address: Joi.string().min(3).max(255).required(),
            price: Joi.number().min(0).max(1000000).required(),
            numOfBeds: Joi.number().min(0).max(1000000).required(),
            rating: Joi.number().min(0).max(5).required(),
            numOfBaths: Joi.number().min(0).max(1000000).required(),
            
    });
    