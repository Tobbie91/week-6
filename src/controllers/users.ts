import {Request, Response, NextFunction} from "express";
 import UserServices from "../services/users";
import { validateUserSchema, validateLoginSchema } from "../utils/usersValidation";


exports.signup = async (req:Request, res:Response)=>{
    try {
        const { error } = validateUserSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        const user = await UserServices.signup(req.body);
        res.status(201).json({message: "Account successfully created", user })
    }
        catch ( error) {
            res.status( 500).json({message: "Email has been used, please change email" });
            console.log(error)
        }

    
};

exports.login = async (req:Request, res:Response,)=>{
    try {
        const { error } = validateLoginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message});
        }
        const user = await UserServices.login(req.body)
        res.status(200).json({message: "Successfully logged in", user })
    }
        catch ( error) {
            res.status(500).json({message: "failed to login"});
        }   
};