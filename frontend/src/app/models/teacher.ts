export class Teacher{
    username: string
    name: string
    lastName: string
    subject: string

    constructor(username, name, lastName, subject) {
        this.name = name;
        this.lastName = lastName
        this.username = username
        this.subject = subject
    }
}