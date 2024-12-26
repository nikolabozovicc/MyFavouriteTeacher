"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const subject_routes_1 = __importDefault(require("./routers/subject.routes"));
const classes_routes_1 = __importDefault(require("./routers/classes.routes"));
const notification_routes_1 = __importDefault(require("./routers/notification.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
// var bodyparser = require('body-parser')
// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json())
// const multer = require('multer')
// const path = require('path')
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "uploads/profilePictures")
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })
// var upload = multer({storage: storage}).single('profilePic')
// app.post('/users/setPicture', (req, res) => {
//     upload(req, res, (err) => {
//         if(err){
//             console.log(err)
//         }
//         console.log(req.file.path)
//     })
// })
mongoose_1.default.connect('mongodb://127.0.0.1:27017/ProjekatFebruar2024');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/subjects', subject_routes_1.default);
router.use('/classes', classes_routes_1.default);
router.use('/notifications', notification_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
