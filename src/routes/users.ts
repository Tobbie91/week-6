import express from 'express';
const UserRoutes = express.Router();
import {home, loggin, signup, show, addlisting, logout} from '../controllers/users'
import * as ListingControllers from "../controllers/listing";
import * as UserControllers from "../controllers/users";
import { verifyToken } from '../middlewares/auth';

UserRoutes.post("/signup", UserControllers.siggnup);
UserRoutes.post("/login", UserControllers.login);

UserRoutes.get('/home', home);
UserRoutes.get('/login', loggin)
UserRoutes.get('/logout', logout)
UserRoutes.get('/signup', signup)
UserRoutes.get('/show:id', show)

UserRoutes.use(verifyToken)

UserRoutes.get('/dashboard', ListingControllers.getListingsForDasboard)
UserRoutes.get('/addlisting', addlisting)
UserRoutes.get('/edit/:id', ListingControllers.getListingByIdForEdit)

export default UserRoutes;