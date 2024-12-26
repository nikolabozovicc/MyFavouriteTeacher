"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectController = void 0;
const subject_1 = __importDefault(require("../models/subject"));
class SubjectController {
    constructor() {
        this.addNewSubject = (req, res) => {
            try {
                let name = req.body.name;
                subject_1.default.findOne({ 'name': name }).then((subject) => {
                    if (subject == null) {
                        let subject = new subject_1.default({
                            name: req.body.name,
                            numberOfTeachers: 0,
                            status: "active"
                        });
                        subject.save().then((respObj) => {
                            res.status(200).json({ message: 'Predmet dodat' });
                        });
                    }
                    else {
                        res.json({ message: 'Predmet vec postoji' });
                    }
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.updateSubject = (req, res) => {
            try {
                let name = req.body.name;
                console.log(name);
                subject_1.default.updateOne({ 'name': name }, { $inc: { 'numberOfTeachers': 1 } }).then((respObj) => {
                    res.json({ message: 'Predmet azuriran' });
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.getAllSubjects = (req, res) => {
            try {
                subject_1.default.find({ "status": "active" }).then((subjects) => {
                    res.json(subjects);
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.updateSubjectDecrease = (req, res) => {
            try {
                let name = req.body.name;
                console.log(name);
                subject_1.default.updateOne({ 'name': name }, { $inc: { 'numberOfTeachers': -1 } }).then((respObj) => {
                    res.json({ message: 'Predmet azuriran' });
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.subjectRequest = (req, res) => {
            try {
                let name = req.body.name;
                subject_1.default.findOne({ 'name': name }).then((subject) => {
                    if (subject == null) {
                        let subject = new subject_1.default({
                            name: req.body.name,
                            numberOfTeachers: 0,
                            status: "request"
                        });
                        subject.save().then((respObj) => {
                            res.status(200).json({ message: 'Predmet dodat' });
                        });
                    }
                    else {
                        res.json({ message: 'Zahtev za dati predmet je vec poslat' });
                    }
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.getRequests = (req, res) => {
            try {
                subject_1.default.find({ "status": "request" }).then((subjects) => {
                    res.json(subjects);
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.acceptSubject = (req, res) => {
            try {
                let name = req.body.name;
                subject_1.default.updateOne({ 'name': name }, { $set: { 'status': 'active' } }).then((respObj) => {
                    res.json({ message: 'Predmet aktiviran' });
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
        this.rejectSubject = (req, res) => {
            try {
                let name = req.body.name;
                subject_1.default.deleteOne({ 'name': name }).then((respObj) => {
                    res.json({ message: 'Predmet odbijen' });
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'error' });
            }
        };
    }
}
exports.SubjectController = SubjectController;
