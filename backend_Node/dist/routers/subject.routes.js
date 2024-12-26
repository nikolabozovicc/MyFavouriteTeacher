"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_controller_1 = require("../controllers/subject.controller");
const subjectRouter = express_1.default.Router();
subjectRouter.route('/addNewSubject').post((req, res) => new subject_controller_1.SubjectController().addNewSubject(req, res));
subjectRouter.route('/getAllSubjects').get((req, res) => new subject_controller_1.SubjectController().getAllSubjects(req, res));
subjectRouter.route('/updateSubject').post((req, res) => new subject_controller_1.SubjectController().updateSubject(req, res));
subjectRouter.route('/updateSubjectDecrease').post((req, res) => new subject_controller_1.SubjectController().updateSubjectDecrease(req, res));
subjectRouter.route('/getRequests').get((req, res) => new subject_controller_1.SubjectController().getRequests(req, res));
subjectRouter.route('/acceptSubject').post((req, res) => new subject_controller_1.SubjectController().acceptSubject(req, res));
subjectRouter.route('/subjectRequest').post((req, res) => new subject_controller_1.SubjectController().subjectRequest(req, res));
subjectRouter.route('/rejectSubject').post((req, res) => new subject_controller_1.SubjectController().rejectSubject(req, res));
exports.default = subjectRouter;
