import express, {Request, Response, NextFunction} from "express";
import path from "path";
import multer from "multer";

const fileSizeLimitErrorHandler = (err:Error  | any, req:Request | any, res: Response, next:NextFunction) => {
    if (err) {
        next(err);
    }else {
        next();
    }
};

//Set The Storage Engine
const storage = multer.diskStorage({
    destination: function (req:Request | any, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb){
        cb(
            null,
            file.fieldname +
            "-" +
            new Date().toISOString().replace(/:/g, "-") +
            path.extname(file.originalname)
        );
    },
});

//Check File Type
function checkFileType(file, cb) {
    //Allowed ext
    const filetypes =/jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mine
const mimetype = filetypes.test(file.mimetype);

if (mimetype && extname) {
    return cb(null, true);
} else {
    cb({ message: "Error: Images Only!"});
  }
}

//Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000},
    fileFilter: function ( req, file, cb) {
        checkFileType(file, cb);
    },
});

module.exports = { upload, fileSizeLimitErrorHandler };
