import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import subjectRouter from './routers/subject.routes';
import classesRouter from './routers/classes.routes';
import notificationRouter from './routers/notification.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

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

mongoose.connect('mongodb://127.0.0.1:27017/ProjekatFebruar2024');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connected');
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/subjects', subjectRouter)
router.use('/classes', classesRouter)
router.use('/notifications', notificationRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));