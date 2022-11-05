import express from 'express';
const UserRoutes = express.Router();
import {home, loggin} from '../controllers/users'

import * as UserControllers from "../controllers/users";

UserRoutes.post("/signup", UserControllers.signup);
UserRoutes.post("/login", UserControllers.login);

UserRoutes.get('/home', home);
UserRoutes.get('/login', loggin)

export default UserRoutes;