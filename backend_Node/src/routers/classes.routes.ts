import express from 'express'
import { ClassesController } from '../controllers/classes.controller';

const classesRouter = express.Router();

classesRouter.route('/requestClass').post(
    (req, res)=> new ClassesController().requestClass(req, res)
)

classesRouter.route('/getRequests').post(
    (req, res)=> new ClassesController().getRequests(req, res)
)

classesRouter.route('/acceptRequest').post(
    (req, res)=> new ClassesController().acceptRequest(req, res)
)

classesRouter.route('/rejectRequest').post(
    (req, res)=> new ClassesController().rejectRequest(req, res)
)

classesRouter.route('/getFiveClasses').post(
    (req, res)=> new ClassesController().getFiveClasses(req, res)
)

classesRouter.route('/getPastClasses').post(
    (req, res)=> new ClassesController().getPastClasses(req, res)
)

classesRouter.route('/getPastStudentClasses').post(
    (req, res)=> new ClassesController().getPastStudentClasses(req, res)
)

classesRouter.route('/rateStudent').post(
    (req, res)=> new ClassesController().rateStudent(req, res)
)

classesRouter.route('/getArchiveClasses').post(
    (req, res)=> new ClassesController().getArchiveClasses(req, res)
)

classesRouter.route('/getFutureClasses').post(
    (req, res)=> new ClassesController().getFutureClasses(req, res)
)

classesRouter.route('/countWeek').get(
    (req, res)=> new ClassesController().countWeek(req, res)
)

classesRouter.route('/countMonth').get(
    (req, res)=> new ClassesController().countMonth(req, res)
)

classesRouter.route('/getAllPastClasses').get(
    (req, res)=> new ClassesController().getAllPastClasses(req, res)
)

export default classesRouter;