import express from 'express'
import ClassesModel from '../models/classes'
import UserModel from '../models/user'

export class ClassesController{
    requestClass = (req: express.Request, res: express.Response) => {
        console.log(req.body.dateAndTime)
        let dateStart: Date = new Date(req.body.dateAndTime)
        dateStart.setHours(dateStart.getHours() + 1)
        req.body.dateAndTime = dateStart
        let dateEnd: Date = new Date(req.body.endTime)
        dateEnd.setHours(dateEnd.getHours() + 1)
        req.body.endTime = dateEnd
        console.log(req.body.dateAndTime)
        ClassesModel.findOne({'teacher': req.body.teacher, $or: [{'dateAndTime': {$gte: dateStart, $lt: dateEnd}},
         {'endTime': {$gt: dateStart, $lte: dateEnd}}, {'dateAndTime': {$lte: dateStart}, 'endTime': {$gte: dateEnd}} ] })
         .then((respObj) => {
            if(respObj != null){
                res.json({message: 'Zauzet termin'})
            }
             else {
                 let classes = new ClassesModel(req.body)
                 classes.save().then((respObj) => {
                     res.json({ message: 'Poslat zahtev' })
                 }).catch((error) => {
                     console.log(error)
                 })
             }
         })
    }

    getRequests = (req: express.Request, res: express.Response) => {
        let teacher = req.body.teacher
        let status = req.body.status
        ClassesModel.find({'teacher': teacher, 'status': status}).then((classes) => {
            res.json(classes)
        }).catch((error) =>{
            console.log(error)
        })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        let _id = req.body._id
        ClassesModel.updateOne({'_id': _id}, {$set: {'status': 'accepted'}}).then((respObj) => {
            res.json({message: 'Cas prihvacen'})
        }).catch((error) =>{
            console.log(error)
        })
    }

    rejectRequest = (req: express.Request, res: express.Response) => {
        let _id = req.body._id
        ClassesModel.deleteOne({'_id': _id}).then((respObj) => {
            res.json({message: 'Cas odbijen'})
        }).catch((error) =>{
            console.log(error)
        })
    }

    getFiveClasses = (req: express.Request, res: express.Response) => {
        let teacher = req.body.teacher
        let today = new Date()
        let threeDays = new Date()
        threeDays.setDate(threeDays.getDate() + 3)
        ClassesModel.find({'teacher': teacher, 'status': 'accepted', 'dateAndTime': {$gte: today, $lte: threeDays}})
        .sort({'dateAndTime': 1})
        .limit(5).then((classes) => {
            res.json(classes)
        }).catch((error) =>{
            console.log(error)
        })
    }

    getPastClasses = (req: express.Request, res: express.Response) => {
        let teacher = req.body.teacher
        let now = new Date()
        ClassesModel.find({'teacher': teacher, 'status': 'accepted', 'dateAndTime': {$lte: now}}).then((classes) => {
            res.json(classes)
        }).catch((error) =>{
            console.log(error)
        })
    }

    getPastStudentClasses = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let teacher = req.body.teacher
        let now = new Date()
        ClassesModel.find({'teacher': teacher, 'username': username, 'status': 'accepted', 'dateAndTime': {$lte: now}}).then((classes) => {
            res.json(classes)
        }).catch((error) =>{
            console.log(error)
        })
    }

    rateStudent = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let _id = req.body._id
        let grade = req.body.grade
        let comment = req.body.comment
        let now = new Date()
        ClassesModel.updateOne({'_id': _id}, {$set: {'teacherComment': comment}}).then((respObj) => {
            UserModel.updateOne({'username': username}, {$push: {'studentGrades': grade}}).then((respObj) =>{
                res.json({message: 'Korisnik je ocenjen'})
            })
        }).catch((error) =>{
            console.log(error)
        })
    }

    getArchiveClasses = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let now = new Date()
        ClassesModel.find({'username': username, 'status': 'accepted', 'dateAndTime': {$lte: now}}).sort({'dateAndTime': -1})
        .then((classes) => {
            res.json(classes)
        }).catch((error) =>{
            console.log(error)
        })
    }

    getFutureClasses = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let today = new Date()
        ClassesModel.find({'username': username, 'status': 'accepted', 'dateAndTime': {$gte: today}})
        .sort({'dateAndTime': 1})
        .then((classes) => {
            res.json(classes)
        }).catch((error) =>{
            console.log(error)
        })
    }

    countWeek = (req: express.Request, res: express.Response) => {
        let today = new Date()
        let sevenDays = new Date()
        sevenDays.setDate(sevenDays.getDate() - 7)
        ClassesModel.countDocuments({'status': 'accepted', 'dateAndTime': {$lt: today, $gte: sevenDays}})
        .then((count) => {
            res.json(count)
        }).catch((error) =>{
            console.log(error)
        })
    }

    countMonth = (req: express.Request, res: express.Response) => {
        let today = new Date()
        let month = new Date()
        month.setMonth(month.getMonth() - 1)
        ClassesModel.countDocuments({'status': 'accepted', 'dateAndTime': {$lt: today, $gte: month}})
        .then((count) => {
            res.json(count)
        }).catch((error) =>{
            console.log(error)
        })
    }

    getAllPastClasses = (req: express.Request, res: express.Response) => {
        let now = new Date()
        ClassesModel.find({'status': 'accepted', 'dateAndTime': {$lte: now}}).then((classes) => {
            res.json(classes)
        }).catch((error) =>{
            console.log(error)
        })
    }

}