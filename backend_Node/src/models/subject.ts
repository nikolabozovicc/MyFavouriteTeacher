import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Subject = new Schema({
    name: {
        type: String
    },
    numberOfTeachers: {
        type: Number
    },
    status: {
        type: String
    }
}
)
 export default mongoose.model('SubjectModel', Subject, 'subjects'); 