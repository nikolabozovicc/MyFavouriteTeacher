import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
}
)
 export default mongoose.model('NorificationModel', Notification, 'notifications'); 