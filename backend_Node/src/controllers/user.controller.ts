import express from 'express'
import UserModel from '../models/user'
import bcrypt from 'bcrypt'

const bcrypt = require('bcrypt');

const multer = require('multer');

const fs = require('fs');

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({ 'username': username }).then((user) => {
            if (user != null) {
                bcrypt.compare(password, user.password).then((result) => {
                    if (result) {
                        res.json(user)
                    }
                    else {
                        res.json(null)
                    }
                });
            }
            else {
                res.json(user)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    adminLogin = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({ 'username': username, 'password': password }).then((user) => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    }

    register = (req: express.Request, res: express.Response) => {

        try {
            let username = req.body.username
            let email = req.body.email

            UserModel.findOne({ 'username': username }).then((user) => {
                if (user != null) {
                    res.json({ message: 'username already exist' })
                }
                else {
                    UserModel.findOne({ 'email': email }).then((user) => {
                        if (user != null) {
                            res.json({ message: 'email already exist' })
                        }
                        else {
                            let saltRounds = 10;
                            bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                                // Store hash in your password DB.
                                req.body.password = hash;
                                let user = new UserModel(req.body);
                                user.save().then((respObj) => {
                                    res.status(200).json({ message: 'user added' })
                                })
                            });
                        }
                    })
                }
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    setPicture = (req: express.Request, res: express.Response) => {
        const profilePicturePath = req.file.path;
        let username = req.body.username
        UserModel.updateOne({'username': username}, {$set: {'profilePic': profilePicturePath}}).then((respObj)=>{
            res.json(respObj);
        }).catch((err) => {
            console.log(err)
        })
    }

    setCv = (req: express.Request, res: express.Response) => {
        const cvPath = req.file.path;
        let username = req.body.username
        UserModel.updateOne({'username': username}, {$set: {'cv': cvPath}}).then((respObj)=>{
            res.json(respObj);
        }).catch((err) => {
            console.log(err)
        })
    }

    changePass = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        let saltRounds = 10;
        bcrypt.hash(password, saltRounds).then((hash) => {
            // Store hash in your password DB.
            password = hash;
            UserModel.updateOne({'username': username}, {$set: {'password': password}}).then((respObj) => {
                res.status(200).json({message: 'password changed'})
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    saveUpdate = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let name = req.body.name
        let lastName = req.body.lastName
        let adress = req.body.adress
        let email = req.body.email
        let phone = req.body.phone
        let school = req.body.school
        let level = req.body.level

        UserModel.findOne({ 'email': email, 'username': { $ne: username } }).then((user) => {
            if (user != null) {
                res.json({ message: 'email already exist' })
            }
            else {
                UserModel.updateOne({'username': username}, {$set: {'name': name, 'lastName': lastName, 'adress': adress,
                    'email': email, 'phone': phone, 'school': school, 'level': level}}).then((respObj) => {
                        res.json({ message: 'user updated' })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    setPictureAndDelete = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        UserModel.findOne({'username': username}).then((user) => {
            const oldProfilePicturePath: string = user.profilePic
            if (fs.existsSync(oldProfilePicturePath)) {
                // Delete the file
                fs.unlinkSync(oldProfilePicturePath);
                console.log('Old profile picture deleted successfully.');
              } else {
                console.log('File not found. No deletion needed.');
              }
              const profilePicturePath = req.file.path;
            UserModel.updateOne({ 'username': username }, { $set: { 'profilePic': profilePicturePath } }).then((respObj) => {
                res.json(respObj);
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.findOne({ 'username': username }).then((user) => {
            console.log(username)
            console.log(user)
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    }

    getAllTeachers = (req: express.Request, res: express.Response) => {
        UserModel.find({'type': 'teacher', 'status': {$ne: 'request'}}).then((teachers) => {
            res.json(teachers)
        }).catch((err) => {
            console.log(err)
        })
    }

    getAllRequests = (req: express.Request, res: express.Response) => {
        UserModel.find({'type': 'teacher', 'status': 'request'}).then((teachers) => {
            res.json(teachers)
        }).catch((err) => {
            console.log(err)
        })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        UserModel.updateOne({'username': username}, {$set: {'status': 'active'}}).then((resp)=>{
            res.json({message: 'Teacher accepted'})
        }).catch((err) => {
            console.log(err)
        })
    }

    rejectRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        UserModel.updateOne({'username': username}, {$set: {'status': 'rejected'}}).then((resp)=>{
            res.json({message: 'Teacher rejected'})
        }).catch((err) => {
            console.log(err)
        })
    }

    saveTeacherUpdate = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let name = req.body.name
        let lastName = req.body.lastName
        let adress = req.body.adress
        let email = req.body.email
        let phone = req.body.phone
        let subjects = req.body.subjects
        let desiredAge = req.body.desiredAge

        UserModel.findOne({ 'email': email, 'username': { $ne: username } }).then((user) => {
            if (user != null) {
                res.json({ message: 'email already exist' })
            }
            else {
                UserModel.updateOne({'username': username}, {$set: {'name': name, 'lastName': lastName, 'adress': adress,
                    'email': email, 'phone': phone, 'subjects': subjects, 'desiredAge': desiredAge}}).then((respObj) => {
                        res.json({ message: 'user updated' })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getAllActiveTeachers = (req: express.Request, res: express.Response) => {
        UserModel.find({'type': 'teacher', 'status': 'active'}).then((teachers) => {
            res.json(teachers)
        }).catch((err) => {
            console.log(err)
        })
    }

    getAllStudents = (req: express.Request, res: express.Response) => {
        UserModel.find({'type': 'student'}).then((students) => {
            res.json(students)
        }).catch((err) => {
            console.log(err)
        })
    }

    getAllAgeTeachers = (req: express.Request, res: express.Response) => {
        let age = req.query.age
        UserModel.find({'type': 'teacher', 'status': 'active', 'desiredAge': {$elemMatch: {'age': age}}}).then((teachers) => {
            res.json(teachers)
        }).catch((err) => {
            console.log(err)
        })
    }

    deactivateTeacher = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        UserModel.updateOne({'username': username}, {$set: {'status': 'deactivated'}}).then((resp)=>{
            res.json({message: 'Ucitelj deaktiviran'})
        }).catch((err) => {
            console.log(err)
        })
    }
}