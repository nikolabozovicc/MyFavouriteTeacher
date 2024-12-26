export class Subject{
    name: string
    selected: boolean
    numberOfTeachers: number

    constructor(name: string, selected: boolean = false) {
        this.name = name;
        this.selected = selected;
    }
}