import express from 'express'
import { SubjectController } from '../controllers/subject.controller';

const subjectRouter = express.Router();

subjectRouter.route('/addNewSubject').post(
    (req, res)=> new SubjectController().addNewSubject(req, res)
)

subjectRouter.route('/getAllSubjects').get(
    (req, res)=> new SubjectController().getAllSubjects(req, res)
)

subjectRouter.route('/updateSubject').post(
    (req, res)=> new SubjectController().updateSubject(req, res)
)

subjectRouter.route('/updateSubjectDecrease').post(
    (req, res)=> new SubjectController().updateSubjectDecrease(req, res)
)

subjectRouter.route('/getRequests').get(
    (req, res)=> new SubjectController().getRequests(req, res)
)

subjectRouter.route('/acceptSubject').post(
    (req, res)=> new SubjectController().acceptSubject(req, res)
)

subjectRouter.route('/subjectRequest').post(
    (req, res)=> new SubjectController().subjectRequest(req, res)
)

subjectRouter.route('/rejectSubject').post(
    (req, res)=> new SubjectController().rejectSubject(req, res)
)

export default subjectRouter;