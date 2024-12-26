"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Classes = new Schema({
    subject: {
        type: String
    },
    dateAndTime: {
        type: Date
    },
    description: {
        type: String
    },
    username: {
        type: String
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    teacher: {
        type: String
    },
    studentGrades: {
        type: [Number]
    },
    teacherComment: {
        type: String
    },
    endTime: {
        type: Date
    },
    status: {
        type: String
    },
});
exports.default = mongoose_1.default.model('ClassesModel', Classes, 'classes');
