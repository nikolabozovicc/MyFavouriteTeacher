import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
        type: [{name: String}]
    },
    desiredAge: {
        type: [{age: String}]
    },
    fromWhereQuestion: {
        type: String
    },
    type: {
        type: String
    },
    status:{
        type: String
    },
    studentGrades:{
        type: [Number]
    }
}
)
 export default mongoose.model('UserModel', User, 'users'); 