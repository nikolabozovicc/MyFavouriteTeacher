"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_1 = __importDefault(require("../models/notification"));
class NotificationController {
    constructor() {
        this.addNotification = (req, res) => {
            // console.log(req.body.dateAndTime)
            // let dateStart: Date = new Date(req.body.dateAndTime)
            // dateStart.setHours(dateStart.getHours() + 1)
            // req.body.dateAndTime = dateStart
            // console.log(req.body.dateAndTime)
            let notifications = new notification_1.default(req.body);
            notifications.save().then((respObj) => {
                res.json({ message: 'Poslato obavestenje' });
            }).catch((error) => {
                console.log(error);
            });
        };
        this.getNotifications = (req, res) => {
            let username = req.body.username;
            notification_1.default.find({ 'username': username }).then((notifications) => {
                res.json(notifications);
            }).catch((error) => {
                console.log(error);
            });
        };
        this.markAsRead = (req, res) => {
            let _id = req.body._id;
            notification_1.default.updateOne({ '_id': _id }, { $set: { 'readed': true } }).then((notifications) => {
                res.json(notifications);
            }).catch((error) => {
                console.log(error);
            });
        };
    }
}
exports.NotificationController = NotificationController;
