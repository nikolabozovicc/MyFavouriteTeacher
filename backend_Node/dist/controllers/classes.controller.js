"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
const classes_1 = __importDefault(require("../models/classes"));
const user_1 = __importDefault(require("../models/user"));
class ClassesController {
    constructor() {
        this.requestClass = (req, res) => {
            console.log(req.body.dateAndTime);
            let dateStart = new Date(req.body.dateAndTime);
            dateStart.setHours(dateStart.getHours() + 1);
            req.body.dateAndTime = dateStart;
            let dateEnd = new Date(req.body.endTime);
            dateEnd.setHours(dateEnd.getHours() + 1);
            req.body.endTime = dateEnd;
            console.log(req.body.dateAndTime);
            classes_1.default.findOne({ 'teacher': req.body.teacher, $or: [{ 'dateAndTime': { $gte: dateStart, $lt: dateEnd } },
                    { 'endTime': { $gt: dateStart, $lte: dateEnd } }, { 'dateAndTime': { $lte: dateStart }, 'endTime': { $gte: dateEnd } }] })
                .then((respObj) => {
                if (respObj != null) {
                    res.json({ message: 'Zauzet termin' });
                }
                else {
                    let classes = new classes_1.default(req.body);
                    classes.save().then((respObj) => {
                        res.json({ message: 'Poslat zahtev' });
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            });
        };
        this.getRequests = (req, res) => {
            let teacher = req.body.teacher;
            let status = req.body.status;
            classes_1.default.find({ 'teacher': teacher, 'status': status }).then((classes) => {
                res.json(classes);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.acceptRequest = (req, res) => {
            let _id = req.body._id;
            classes_1.default.updateOne({ '_id': _id }, { $set: { 'status': 'accepted' } }).then((respObj) => {
                res.json({ message: 'Cas prihvacen' });
            }).catch((error) => {
                console.log(error);
            });
        };
        this.rejectRequest = (req, res) => {
            let _id = req.body._id;
            classes_1.default.deleteOne({ '_id': _id }).then((respObj) => {
                res.json({ message: 'Cas odbijen' });
            }).catch((error) => {
                console.log(error);
            });
        };
        this.getFiveClasses = (req, res) => {
            let teacher = req.body.teacher;
            let today = new Date();
            let threeDays = new Date();
            threeDays.setDate(threeDays.getDate() + 3);
            classes_1.default.find({ 'teacher': teacher, 'status': 'accepted', 'dateAndTime': { $gte: today, $lte: threeDays } })
                .sort({ 'dateAndTime': 1 })
                .limit(5).then((classes) => {
                res.json(classes);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.getPastClasses = (req, res) => {
            let teacher = req.body.teacher;
            let now = new Date();
            classes_1.default.find({ 'teacher': teacher, 'status': 'accepted', 'dateAndTime': { $lte: now } }).then((classes) => {
                res.json(classes);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.getPastStudentClasses = (req, res) => {
            let username = req.body.username;
            let teacher = req.body.teacher;
            let now = new Date();
            classes_1.default.find({ 'teacher': teacher, 'username': username, 'status': 'accepted', 'dateAndTime': { $lte: now } }).then((classes) => {
                res.json(classes);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.rateStudent = (req, res) => {
            let username = req.body.username;
            let _id = req.body._id;
            let grade = req.body.grade;
            let comment = req.body.comment;
            let now = new Date();
            classes_1.default.updateOne({ '_id': _id }, { $set: { 'teacherComment': comment } }).then((respObj) => {
                user_1.default.updateOne({ 'username': username }, { $push: { 'studentGrades': grade } }).then((respObj) => {
                    res.json({ message: 'Korisnik je ocenjen' });
                });
            }).catch((error) => {
                console.log(error);
            });
        };
        this.getArchiveClasses = (req, res) => {
            let username = req.body.username;
            let now = new Date();
            classes_1.default.find({ 'username': username, 'status': 'accepted', 'dateAndTime': { $lte: now } }).sort({ 'dateAndTime': -1 })
                .then((classes) => {
                res.json(classes);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.getFutureClasses = (req, res) => {
            let username = req.body.username;
            let today = new Date();
            classes_1.default.find({ 'username': username, 'status': 'accepted', 'dateAndTime': { $gte: today } })
                .sort({ 'dateAndTime': 1 })
                .then((classes) => {
                res.json(classes);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.countWeek = (req, res) => {
            let today = new Date();
            let sevenDays = new Date();
            sevenDays.setDate(sevenDays.getDate() - 7);
            classes_1.default.countDocuments({ 'status': 'accepted', 'dateAndTime': { $lt: today, $gte: sevenDays } })
                .then((count) => {
                res.json(count);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.countMonth = (req, res) => {
            let today = new Date();
            let month = new Date();
            month.setMonth(month.getMonth() - 1);
            classes_1.default.countDocuments({ 'status': 'accepted', 'dateAndTime': { $lt: today, $gte: month } })
                .then((count) => {
                res.json(count);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.getAllPastClasses = (req, res) => {
            let now = new Date();
            classes_1.default.find({ 'status': 'accepted', 'dateAndTime': { $lte: now } }).then((classes) => {
                res.json(classes);
            }).catch((error) => {
                console.log(error);
            });
        };
    }
}
exports.ClassesController = ClassesController;
