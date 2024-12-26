"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username }).then((user) => {
                if (user != null) {
                    bcrypt.compare(password, user.password).then((result) => {
                        if (result) {
                            res.json(user);
                        }
                        else {
                            res.json(null);
                        }
                    });
                }
                else {
                    res.json(user);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.adminLogin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.register = (req, res) => {
            try {
                let username = req.body.username;
                let email = req.body.email;
                user_1.default.findOne({ 'username': username }).then((user) => {
                    if (user != null) {
                        res.json({ message: 'username already exist' });
                    }
                    else {
                        user_1.default.findOne({ 'email': email }).then((user) => {
                            if (user != null) {
                                res.json({ message: 'email already exist' });
                            }
                            else {
                                let saltRounds = 10;
                                bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                                    // Store hash in your password DB.
                                    req.body.password = hash;
                                    let user = new user_1.default(req.body);
                                    user.save().then((respObj) => {
                                        res.status(200).json({ message: 'user added' });
                                    });
                                });
                            }
                        });
                    }
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.setPicture = (req, res) => {
            const profilePicturePath = req.file.path;
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'profilePic': profilePicturePath } }).then((respObj) => {
                res.json(respObj);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.setCv = (req, res) => {
            const cvPath = req.file.path;
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'cv': cvPath } }).then((respObj) => {
                res.json(respObj);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.changePass = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let saltRounds = 10;
            bcrypt.hash(password, saltRounds).then((hash) => {
                // Store hash in your password DB.
                password = hash;
                user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }).then((respObj) => {
                    res.status(200).json({ message: 'password changed' });
                }).catch((err) => {
                    console.log(err);
                });
            });
        };
        this.saveUpdate = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let lastName = req.body.lastName;
            let adress = req.body.adress;
            let email = req.body.email;
            let phone = req.body.phone;
            let school = req.body.school;
            let level = req.body.level;
            user_1.default.findOne({ 'email': email, 'username': { $ne: username } }).then((user) => {
                if (user != null) {
                    res.json({ message: 'email already exist' });
                }
                else {
                    user_1.default.updateOne({ 'username': username }, { $set: { 'name': name, 'lastName': lastName, 'adress': adress,
                            'email': email, 'phone': phone, 'school': school, 'level': level } }).then((respObj) => {
                        res.json({ message: 'user updated' });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.setPictureAndDelete = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then((user) => {
                const oldProfilePicturePath = user.profilePic;
                if (fs.existsSync(oldProfilePicturePath)) {
                    // Delete the file
                    fs.unlinkSync(oldProfilePicturePath);
                    console.log('Old profile picture deleted successfully.');
                }
                else {
                    console.log('File not found. No deletion needed.');
                }
                const profilePicturePath = req.file.path;
                user_1.default.updateOne({ 'username': username }, { $set: { 'profilePic': profilePicturePath } }).then((respObj) => {
                    res.json(respObj);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then((user) => {
                console.log(username);
                console.log(user);
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAllTeachers = (req, res) => {
            user_1.default.find({ 'type': 'teacher', 'status': { $ne: 'request' } }).then((teachers) => {
                res.json(teachers);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAllRequests = (req, res) => {
            user_1.default.find({ 'type': 'teacher', 'status': 'request' }).then((teachers) => {
                res.json(teachers);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.acceptRequest = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'active' } }).then((resp) => {
                res.json({ message: 'Teacher accepted' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.rejectRequest = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'rejected' } }).then((resp) => {
                res.json({ message: 'Teacher rejected' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.saveTeacherUpdate = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let lastName = req.body.lastName;
            let adress = req.body.adress;
            let email = req.body.email;
            let phone = req.body.phone;
            let subjects = req.body.subjects;
            let desiredAge = req.body.desiredAge;
            user_1.default.findOne({ 'email': email, 'username': { $ne: username } }).then((user) => {
                if (user != null) {
                    res.json({ message: 'email already exist' });
                }
                else {
                    user_1.default.updateOne({ 'username': username }, { $set: { 'name': name, 'lastName': lastName, 'adress': adress,
                            'email': email, 'phone': phone, 'subjects': subjects, 'desiredAge': desiredAge } }).then((respObj) => {
                        res.json({ message: 'user updated' });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAllActiveTeachers = (req, res) => {
            user_1.default.find({ 'type': 'teacher', 'status': 'active' }).then((teachers) => {
                res.json(teachers);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAllStudents = (req, res) => {
            user_1.default.find({ 'type': 'student' }).then((students) => {
                res.json(students);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAllAgeTeachers = (req, res) => {
            let age = req.query.age;
            user_1.default.find({ 'type': 'teacher', 'status': 'active', 'desiredAge': { $elemMatch: { 'age': age } } }).then((teachers) => {
                res.json(teachers);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.deactivateTeacher = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'deactivated' } }).then((resp) => {
                res.json({ message: 'Ucitelj deaktiviran' });
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.UserController = UserController;
