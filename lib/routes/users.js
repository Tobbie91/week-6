"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes = express_1.default.Router();
const users_1 = require("../controllers/users");
const ListingControllers = __importStar(require("../controllers/listing"));
const UserControllers = __importStar(require("../controllers/users"));
const auth_1 = require("../middlewares/auth");
UserRoutes.post("/signup", UserControllers.siggnup);
UserRoutes.post("/login", UserControllers.login);
UserRoutes.get('/home', users_1.home);
UserRoutes.get('/login', users_1.loggin);
UserRoutes.get('/logout', users_1.logout);
UserRoutes.get('/signup', users_1.signup);
UserRoutes.get('/show:id', users_1.show);
UserRoutes.use(auth_1.verifyToken);
UserRoutes.get('/dashboard', ListingControllers.getListingsForDasboard);
UserRoutes.get('/addlisting', users_1.addlisting);
UserRoutes.get('/edit/:id', ListingControllers.getListingByIdForEdit);
exports.default = UserRoutes;
