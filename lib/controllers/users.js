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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.addlisting = exports.dashboard = exports.show = exports.signup = exports.loggin = exports.home = exports.login = exports.siggnup = void 0;
// const router =express.Router();
const UserServices = __importStar(require("../services/users"));
const usersValidation_1 = require("../utils/usersValidation");
const ListingService = __importStar(require("../services/listing"));
const siggnup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateUser)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield UserServices.signup(req.body);
        res.status(201).redirect('/dashboard');
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.siggnup = siggnup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateLogin)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield UserServices.login(req.body);
        const listings = yield ListingService.getListingsByUser(user.id);
        req.session.regenerate(function (err) {
            if (err)
                throw new Error(err);
            req.session.user = user;
            req.session.save(function (err) {
                if (err)
                    throw new Error(err);
                res.status(301).redirect('dashboard');
            });
        });
        return;
        // res.status(200).json({ message: MSG_TYPES.LOGGED_IN, user });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.login = login;
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listings = yield ListingService.getListings();
        res.render('pages/index', { listings });
    }
    catch (err) {
        console.log(err);
    }
});
exports.home = home;
const loggin = (req, res) => {
    res.render('pages/login');
};
exports.loggin = loggin;
const signup = (req, res) => {
    res.render('pages/signup');
};
exports.signup = signup;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listings = yield ListingService.getListingById(+req.params.id);
        res.render('pages/show', { listings });
    }
    catch (err) {
        console.log(err);
    }
});
exports.show = show;
// router.use(verifyToken)
const dashboard = (req, res) => {
    res.render('pages/dashboard');
};
exports.dashboard = dashboard;
const addlisting = (req, res) => {
    res.render('pages/addlisting');
};
exports.addlisting = addlisting;
// export const edit = (req: Request, res:Response) =>{
// 	res.render('pages/edit/:id')
// }
const logout = function (req, res, next) {
    req.session.user = null;
    req.session.save(function (err) {
        if (err)
            next(err);
        req.session.regenerate(function (err) {
            if (err)
                next(err);
            res.redirect('/');
        });
    });
};
exports.logout = logout;
