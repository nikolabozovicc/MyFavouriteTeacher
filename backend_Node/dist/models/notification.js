"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Notification = new Schema({
    title: {
        type: String
    },
    subject: {
        type: String
    },
    dateAndTime: {
        type: Date
    },
    username: {
        type: String
    },
    teacher: {
        type: String
    },
    readed: {
        type: Boolean
    },
    reason: {
        type: String
    }
});
exports.default = mongoose_1.default.model('NorificationModel', Notification, 'notifications');
