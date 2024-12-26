import express from 'express'
import NotificationModel from '../models/notification'

export class NotificationController{
    addNotification = (req: express.Request, res: express.Response) => {
        // console.log(req.body.dateAndTime)
        // let dateStart: Date = new Date(req.body.dateAndTime)
        // dateStart.setHours(dateStart.getHours() + 1)
        // req.body.dateAndTime = dateStart
        // console.log(req.body.dateAndTime)
        let notifications = new NotificationModel(req.body)
        notifications.save().then((respObj) => {
            res.json({message: 'Poslato obavestenje'})
        }).catch((error) =>{
            console.log(error)
        })
    }

    getNotifications = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        NotificationModel.find({'username': username}).then((notifications) => {
            res.json(notifications)
        }).catch((error) =>{
            console.log(error)
        })
    }

    markAsRead = (req: express.Request, res: express.Response) => {
        let _id = req.body._id
        NotificationModel.updateOne({'_id': _id}, {$set: {'readed': true}}).then((notifications) => {
            res.json(notifications)
        }).catch((error) =>{
            console.log(error)
        })
    }
}