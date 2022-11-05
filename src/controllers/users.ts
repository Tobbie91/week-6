import { Request, Response } from "express";
import * as UserServices from "../services/users";
import { validateUser, validateLogin } from "../utils/usersValidation";
import MSG_TYPES from "../utils/validation/msgTypes";
import * as ListingService from "../services/listing";

export const signup = async (req: Request, res: Response) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const user = await UserServices.signup(req.body);
		res.status(201).json({ message: MSG_TYPES.ACCOUNT_CREATED, user });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { error } = validateLogin(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const user = await UserServices.login(req.body);
		res.status(200).json({ message: MSG_TYPES.LOGGED_IN, user });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};
export const home =  async (req: Request, res: Response) => {
	try{
		//const listings = await ListingService.getListings();
		// console.log(products[0].dataValues)
		res.render('index')
		//res.status(200).json({ message: "User successfully created" });
        return;
	}catch(err){
		//console.log(err)
		console.log("hello")
	}
}
export const loggin = (req: Request, res:Response) =>{
	res.render('pages/login')
}