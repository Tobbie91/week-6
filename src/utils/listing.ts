import Joi from "joi";

const validateListing = (data:any) => {
    const schema = Joi.object({
            description: Joi.string().min(3).max(255).required(), 
            address: Joi.string().min(3).max(255).required(),
            price: Joi.number().min(0).max(1000000).required(),
            numOfBeds: Joi.number().min(0).max(5).required(),
            numOfBaths: Joi.number().min(0).max(5).required()
    });
    return schema.validate(data);
    };
   export default validateListing