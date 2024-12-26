"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvUpload = exports.profilePicUpload = void 0;
const multer = require('multer');
const path = require('path');
var profilePicstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/profilePictures");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
exports.profilePicUpload = multer({ storage: profilePicstorage }).single('profilePic');
var cvStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/CVs");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
exports.cvUpload = multer({ storage: cvStorage }).single('cv');
