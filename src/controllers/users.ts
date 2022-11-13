import { Request, Response } from "express";
// const router =express.Router();

import * as UserServices from "../services/users";
import { validateUser, validateLogin } from "../utils/usersValidation";
import MSG_TYPES from "../utils/validation/msgTypes";
import * as ListingService from "../services/listing";
import { NextFunction } from "express-serve-static-core";
// import { verifyToken } from "../middlewares/auth";

declare module 'express-session' {
	interface SessionData {
		user : any
	}
}


export const siggnup = async (req: Request, res: Response) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const user = await UserServices.signup(req.body);
		res.status(201).redirect('/dashboard');
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
		const listings = await ListingService.getListingsByUser(user.id);
		
		req.session.regenerate(function(err){
			if (err) throw new Error(err)

			req.session.user =user;
			req.session.save(function(err){
				if(err) throw new Error(err)
				res.status(301).redirect('dashboard');
			})
		})

		return;
		// res.status(200).json({ message: MSG_TYPES.LOGGED_IN, user });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};
export const home =  async (req: Request, res: Response) => {
	try{
		const listings = await ListingService.getListings();
		res.render('pages/index', {listings});
	}catch(err){
		console.log(err)
	}
}
export const loggin = (req: Request, res:Response) =>{
	res.render('pages/login')
}

export const signup = (req: Request, res:Response) =>{
	res.render('pages/signup')
}

export const show =  async (req: Request, res: Response) => {
		try{
			const listings = await ListingService.getListingById(+req.params.id);
			res.render('pages/show', {listings});
		}catch(err){
			console.log(err)
		}
}

// router.use(verifyToken)

export const dashboard = (req: Request, res:Response) =>{
	res.render('pages/dashboard')
}

export const addlisting = (req: Request, res:Response) =>{
	res.render('pages/addlisting')

}
// export const edit = (req: Request, res:Response) =>{
// 	res.render('pages/edit/:id')

// }
export const logout = function(req:Request, res:Response, next:NextFunction){
	req.session.user = null;
	req.session.save(function(err){
		if (err) next (err)
		req.session.regenerate(function(err){
			if(err) next(err)
			res.redirect('/')
		})
	})
}