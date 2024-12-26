import { Age } from "./age"
import { Subject } from "./subject"

export class User {
    username: string
    password: string
    securityQuestion: string
    securityAnswer: string
    name: string
    lastName: string
    sex: string
    adress: string
    phone: string
    email: string
    profilePic: string
    school: string
    level: number
    cv: string
    subjects: Array<Subject>
    desiredAge: Array<Age>
    fromWhereQuestion: string
    type: string
    status: string
    studentGrades: Array<number>
}