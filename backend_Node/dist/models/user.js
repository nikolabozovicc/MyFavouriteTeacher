"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    securityQuestion: {
        type: String
    },
    securityAnswer: {
        type: String
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    sex: {
        type: String
    },
    adress: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String
    },
    school: {
        type: String
    },
    level: {
        type: Number
    },
    cv: {
        type: String
    },
    subjects: {
        type: [{ name: String }]
    },
    desiredAge: {
        type: [{ age: String }]
    },
    fromWhereQuestion: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    studentGrades: {
        type: [Number]
    }
});
exports.default = mongoose_1.default.model('UserModel', User, 'users');
