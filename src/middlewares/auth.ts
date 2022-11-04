import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../models";
// const { User } = require("../models");

export async function verifyToken(req:any, res:any, next:any) {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const  token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string)as JwtPayload;
            console.log("decoded", decoded);
            const user = await db.User.findOne({ where: { id: decoded?.id}})
            // console.log(user)
            req.user = user;
            return next();
        } catch (error) {
            console.log(error)
            res.status(400).send("Invalid token");
        }
    }  else {
        return res.status(404).send("Bearer token is missing")
    }
}
// module.exports = verifyToken;