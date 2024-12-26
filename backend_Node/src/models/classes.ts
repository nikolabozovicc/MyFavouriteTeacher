import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
}
)
 export default mongoose.model('ClassesModel', Classes, 'classes'); 