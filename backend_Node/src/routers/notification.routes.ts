import express from 'express'
import { NotificationController } from '../controllers/notification.controller';

const notificationRouter = express.Router();

notificationRouter.route('/addNotification').post(
    (req, res)=> new NotificationController().addNotification(req, res)
)

notificationRouter.route('/getNotifications').post(
    (req, res)=> new NotificationController().getNotifications(req, res)
)

notificationRouter.route('/markAsRead').post(
    (req, res)=> new NotificationController().markAsRead(req, res)
)


export default notificationRouter;