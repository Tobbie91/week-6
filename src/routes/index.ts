import express from "express";
const router = express.Router();

import UserRoutes from "./users";
import ListingRoutes from "./listing";

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use("/", UserRoutes);
router.use("/listing", ListingRoutes);

export default router;
