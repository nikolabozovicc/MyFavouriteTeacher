"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multers_1 = require("../multers");
const multers_2 = require("../multers");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/adminLogin').post((req, res) => new user_controller_1.UserController().adminLogin(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/setPicture').post((req, res) => (0, multers_1.profilePicUpload)(req, res, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(req.file.path);
    new user_controller_1.UserController().setPicture(req, res);
}));
userRouter.route('/setCv').post((req, res) => (0, multers_2.cvUpload)(req, res, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(req.file.path);
    new user_controller_1.UserController().setCv(req, res);
}));
userRouter.route('/changePass').post((req, res) => new user_controller_1.UserController().changePass(req, res));
userRouter.route('/saveUpdate').post((req, res) => new user_controller_1.UserController().saveUpdate(req, res));
userRouter.route('/setPictureAndDelete').post((req, res) => (0, multers_1.profilePicUpload)(req, res, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(req.file.path);
    new user_controller_1.UserController().setPictureAndDelete(req, res);
}));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/getAllTeachers').get((req, res) => new user_controller_1.UserController().getAllTeachers(req, res));
userRouter.route('/getAllRequests').get((req, res) => new user_controller_1.UserController().getAllRequests(req, res));
userRouter.route('/acceptRequest').post((req, res) => new user_controller_1.UserController().acceptRequest(req, res));
userRouter.route('/rejectRequest').post((req, res) => new user_controller_1.UserController().rejectRequest(req, res));
userRouter.route('/saveTeacherUpdate').post((req, res) => new user_controller_1.UserController().saveTeacherUpdate(req, res));
userRouter.route('/getAllActiveTeachers').get((req, res) => new user_controller_1.UserController().getAllActiveTeachers(req, res));
userRouter.route('/getAllStudents').get((req, res) => new user_controller_1.UserController().getAllStudents(req, res));
userRouter.route('/getAllAgeTeachers').get((req, res) => new user_controller_1.UserController().getAllAgeTeachers(req, res));
userRouter.route('/deactivateTeacher').post((req, res) => new user_controller_1.UserController().deactivateTeacher(req, res));
exports.default = userRouter;
