import express from "express";
const router = express.Router();

import UserControllers from "../controllers/users";

router.post("/signup", UserControllers.signup);

router.post("/login", UserControllers.login);

export default router;
