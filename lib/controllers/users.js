"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSecListingPage = exports.renderListingPage = exports.renderHomePage = exports.renderLoginPage = exports.renderRegisterPage = exports.logout = exports.getUsers = exports.loginUser = exports.registerUsers = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../model/user");
const hotel_1 = require("../model/hotel");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function registerUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = (0, uuid_1.v4)();
        console.log(req.body);
        try {
            const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
            if (validationResult.error) {
                return res.status(400).json({
                    Error: validationResult.error.details[0].message
                });
            }
            const emailDuplicates = yield user_1.UserInstance.findOne({ where: { email: req.body.email } });
            if (emailDuplicates) {
                return res.status(409).json({
                    msg: "Email has been used, please change email"
                });
            }
            const phoneNoDuplicates = yield user_1.UserInstance.findOne({ where: { phoneNumber: req.body.phoneNumber } });
            if (phoneNoDuplicates) {
                return res.status(409).json({ msg: "phone number has been used" });
            }
            const passwordHash = yield bcryptjs_1.default.hash(req.body.password, 8);
            const record = yield user_1.UserInstance.create({
                id: user_id,
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: passwordHash,
            });
            //return res.json(record)
            res.render("login");
            // res.status(200).json({
            //     msg: "you have sucessfully created a user",
            //     record
            // })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'failed to register',
                route: '/register'
            });
        }
    });
}
exports.registerUsers = registerUsers;
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        try {
            const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
            if (validationResult.error) {
                return res.status(400).json({
                    Error: validationResult.error.details[0].message
                });
            }
            const hotelUser = yield user_1.UserInstance.findOne({ where: { email: req.body.email } });
            const { id } = hotelUser;
            const token = (0, utils_1.generateToken)({ id });
            res.cookie("auth", token, { httpOnly: true, secure: true });
            res.cookie("id", id, {
                httpOnly: true,
                secure: true
            });
            const validHotelUser = yield bcryptjs_1.default.compare(req.body.password, hotelUser.password);
            if (!validHotelUser) {
                res.status(401).json({
                    message: "password do not match",
                });
            }
            if (validHotelUser) {
                // res.status(200).json({
                //     message: "Sucessfully logged in",
                //     token,
                //     hotelUser
                // })
                res.redirect('/users/home');
            }
        }
        catch (error) {
            res.status(500).json({
                message: "failed to login",
                route: "/login"
            });
        }
    });
}
exports.loginUser = loginUser;
function getUsers(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
            const offset = (_b = req.query) === null || _b === void 0 ? void 0 : _b.offset;
            //const record = await hotelInstance.findAll({where: {}})
            const record = yield user_1.UserInstance.findAndCountAll({ limit, offset, include: [{
                        model: hotel_1.hotelInstance,
                        as: 'hotel'
                    }]
            });
            res.status(200).json({
                msg: "All Hotels fetched successfully",
                count: record.count,
                record: record.rows
            });
        }
        catch (error) {
            res.status(500).json({
                msg: "failed to fetch hotels",
                route: "/read"
            });
        }
    });
}
exports.getUsers = getUsers;
function logout(req, res) {
    res.clearCookie('auth');
    res.clearCookie('id');
    res.status(200).json({
        message: "you have successfully logged out"
    });
    // res.redirect('/signin')
}
exports.logout = logout;
function renderRegisterPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('register');
    });
}
exports.renderRegisterPage = renderRegisterPage;
function renderLoginPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('login');
    });
}
exports.renderLoginPage = renderLoginPage;
function renderHomePage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('home');
    });
}
exports.renderHomePage = renderHomePage;
function renderListingPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.UserInstance.findOne({ where: { id: req.cookies.id }, include: [{ model: hotel_1.hotelInstance, as: 'hotels' }] });
            res.render('listing1', { user });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'failed to render listing1' });
        }
    });
}
exports.renderListingPage = renderListingPage;
function renderSecListingPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, node_fetch_1.default)('https://localhost:4000/hotels/read').then((response) => response.json());
        const useData = data.record;
        res.render('listing2', { useData });
    });
}
exports.renderSecListingPage = renderSecListingPage;
;
