import express from 'express'
import SubjectModel from '../models/subject'

export class SubjectController{
    addNewSubject = (req: express.Request, res: express.Response) => {
        try {
            let name = req.body.name;
            SubjectModel.findOne({ 'name': name }).then((subject) => {
                if (subject == null) {
                    let subject = new SubjectModel({
                        name : req.body.name,
                        numberOfTeachers: 0,
                        status: "active"
                    })
                    subject.save().then((respObj) => {
                        res.status(200).json({ message: 'Predmet dodat' })
                    })
                }
                else {
                    res.json({ message: 'Predmet vec postoji' })
                }
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    updateSubject = (req: express.Request, res: express.Response) => {
        try {
            let name = req.body.name
            console.log(name)
            SubjectModel.updateOne({'name': name}, {$inc: {'numberOfTeachers': 1}}).then((respObj) => {
                res.json({message: 'Predmet azuriran'})
            })         
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    getAllSubjects = (req: express.Request, res: express.Response) => {
        try {
            SubjectModel.find({"status": "active"}).then((subjects) => {
                res.json(subjects)
            })         
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    updateSubjectDecrease = (req: express.Request, res: express.Response) => {
        try {
            let name = req.body.name
            console.log(name)
            SubjectModel.updateOne({'name': name}, {$inc: {'numberOfTeachers': -1}}).then((respObj) => {
                res.json({message: 'Predmet azuriran'})
            })         
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    subjectRequest = (req: express.Request, res: express.Response) => {
        try {
            let name = req.body.name;
            SubjectModel.findOne({ 'name': name }).then((subject) => {
                if (subject == null) {
                    let subject = new SubjectModel({
                        name : req.body.name,
                        numberOfTeachers: 0,
                        status: "request"
                    })
                    subject.save().then((respObj) => {
                        res.status(200).json({ message: 'Predmet dodat' })
                    })
                }
                else {
                    res.json({ message: 'Zahtev za dati predmet je vec poslat' })
                }
            })        
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    getRequests = (req: express.Request, res: express.Response) => {
        try {
            SubjectModel.find({"status": "request"}).then((subjects) => {
                res.json(subjects)
            })         
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    acceptSubject = (req: express.Request, res: express.Response) => {
        try {
            let name = req.body.name
            SubjectModel.updateOne({'name': name}, {$set: {'status': 'active'}}).then((respObj) => {
                res.json({message: 'Predmet aktiviran'})
            })         
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }

    rejectSubject = (req: express.Request, res: express.Response) => {
        try {
            let name = req.body.name
            SubjectModel.deleteOne({'name': name}).then((respObj) => {
                res.json({message: 'Predmet odbijen'})
            })         
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error' })
        }
    }
}