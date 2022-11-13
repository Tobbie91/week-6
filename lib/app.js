"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const SequelizeStore = require("connect-session-sequelize")(express_session_1.default.Store);
dotenv_1.default.config();
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// view engine setup
app.set("views", path_1.default.join(__dirname, "..", path_1.default.sep, "views"));
//app.set('views', path.join(__dirname, '../views'));
app.set("view engine", "ejs");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)('_method'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
// Require static assets from public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// app.get('/', function(req, res) {
// 	res.render('pages/index');
// });
app.use("/", index_1.default);
app.use(express_1.default.static("public"));
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;
