import jwt, { JwtPayload } from "jsonwebtoken";
import {Request, Response, NextFunction } from "express";
import db from "../models";
import "dotenv/config"
// const { User } = require("../models");

export async function verifyToken(req: Request, res: Response, next:NextFunction) {
    
    let token: string;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }else {
        token = <string>req.session?.user?.token;
    }
        try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            const user = await db.User.findOne({ where: { id: decoded?.id}})
            res.locals.user = user
            next();
        } catch (error) {
            res.status(400).render('pages/login', { message: "You are Not logged in"})
        }

    }
// module.exports = verifyToken;