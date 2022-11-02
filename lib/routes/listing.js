"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const listing_1 = require("../controller/listing");
/* GET hotel listing(routers). */
router.post('/create', auth_1.auth, listing_1.createHotels);
router.get('/read', listing_1.getHotels);
router.get("/read/:id", listing_1.getSingleHotel);
router.post("/update/:id", auth_1.auth, listing_1.updateHotels);
router.delete('/delete/:id', auth_1.auth, listing_1.deleteHotel);
exports.default = router;
