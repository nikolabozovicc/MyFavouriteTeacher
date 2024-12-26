"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const notificationRouter = express_1.default.Router();
notificationRouter.route('/addNotification').post((req, res) => new notification_controller_1.NotificationController().addNotification(req, res));
notificationRouter.route('/getNotifications').post((req, res) => new notification_controller_1.NotificationController().getNotifications(req, res));
notificationRouter.route('/markAsRead').post((req, res) => new notification_controller_1.NotificationController().markAsRead(req, res));
exports.default = notificationRouter;
