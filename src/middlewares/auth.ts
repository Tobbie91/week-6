// import express, {Request, Response, NextFunction} from "express";
// import jwt from "jsonwebtoken";
// const secret = process.env.JWT_SECRET as string
// import { User } from "../models/user"

// export async function auth(req:Request |any, res:Response, next:NextFunction){
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             const token = req.headers.authorization.split(" ")[1];
//             let verified = jwt.verify(token, secret);
//             const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//             console.log("decoded", decoded);

//             const { id } = verified as {[key: string]: string}
//             const user = await User.findOne({ where: {id}});
//             req.user = user;
//             return next();
//         } catch (error) {
//             res.status(400).send("Invalid token");
//         }
//     }  else {
//         return res.status(404).send("Bearer token is missing");
//     }
// }
// exports verifyToken;

import express, {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string
import User from "../models/user";

export async function auth(req:Request |any, res:Response, next:NextFunction){
    const authorization = req.cookies.auth
    //console.log(req.cookies)
    try {
        if(!authorization){
            res.status(401).send({
                Error: 'Kindly sign in as a user'
            })
        }
        const token = authorization
        
        let verified = jwt.verify(token, secret);
     

        if(!verified){
            return res.status(401).json({
                Error: 'User not verified, you cant access this route'
            })
        }

        const { id } = verified as {[key: string]: string}

        const user = await User.findOne({where: {id}})
        if(!user){
            return res.status(404).json({
                Error: 'User not verified'
            })
        }
        req.user = verified
        next()
    } catch (error) {
        res.status(403).json({
            Error: 'User not logged in'
        })
    }
}
