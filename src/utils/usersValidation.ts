import Joi from 'joi';

// const userSchema = Joi.object({
//     fullname: Joi.string().required(),
//     phoneNumber: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),

// });

// const validateAdmin = (admin) =>{
//     const Schema = Joi.object().keys({
//         username: Joi.string().max(30).required(),
//         password: Joi.string().max(30).required(),
//     });

//     return Schema.validate(admin)
//};

export const validateUserSchema = Joi.object().keys({

        fullname: Joi.string().required().min(3).max(50),
        phoneNumber: Joi.string().required().min(11).max(13),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirm_password:Joi.ref("password"),
}).with("password", "confirm_password")



export const validateLoginSchema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
    });


