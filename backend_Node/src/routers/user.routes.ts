import express from 'express'
import { UserController } from '../controllers/user.controller';
import { profilePicUpload } from '../multers';
import { cvUpload } from '../multers';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
)

userRouter.route('/adminLogin').post(
    (req, res)=> new UserController().adminLogin(req, res)
)

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
)

userRouter.route('/setPicture').post(
    (req, res) => profilePicUpload(req, res, (err) => {
        if(err){
            console.log(err)
        }
        console.log(req.file.path)
        new UserController().setPicture(req, res)
    })
)

userRouter.route('/setCv').post(
    (req, res) => cvUpload(req, res, (err) => {
        if(err){
            console.log(err)
        }
        console.log(req.file.path)
        new UserController().setCv(req, res)
    })
)

userRouter.route('/changePass').post(
    (req, res)=> new UserController().changePass(req, res)
)

userRouter.route('/saveUpdate').post(
    (req, res)=> new UserController().saveUpdate(req, res)
)

userRouter.route('/setPictureAndDelete').post(
    (req, res) => profilePicUpload(req, res, (err) => {
        if(err){
            console.log(err)
        }
        console.log(req.file.path)
        new UserController().setPictureAndDelete(req, res)
    })
)

userRouter.route('/getUser').post(
    (req, res)=> new UserController().getUser(req, res)
)

userRouter.route('/getAllTeachers').get(
    (req, res)=> new UserController().getAllTeachers(req, res)
)

userRouter.route('/getAllRequests').get(
    (req, res)=> new UserController().getAllRequests(req, res)
)

userRouter.route('/acceptRequest').post(
    (req, res)=> new UserController().acceptRequest(req, res)
)

userRouter.route('/rejectRequest').post(
    (req, res)=> new UserController().rejectRequest(req, res)
)

userRouter.route('/saveTeacherUpdate').post(
    (req, res)=> new UserController().saveTeacherUpdate(req, res)
)

userRouter.route('/getAllActiveTeachers').get(
    (req, res)=> new UserController().getAllActiveTeachers(req, res)
)

userRouter.route('/getAllStudents').get(
    (req, res)=> new UserController().getAllStudents(req, res)
)

userRouter.route('/getAllAgeTeachers').get(
    (req, res)=> new UserController().getAllAgeTeachers(req, res)
)

userRouter.route('/deactivateTeacher').post(
    (req, res)=> new UserController().deactivateTeacher(req, res)
)

export default userRouter;