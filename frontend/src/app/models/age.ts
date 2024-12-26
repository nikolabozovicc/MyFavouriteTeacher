export class Age{
    age: string
    selected: boolean

    constructor(age: string, selected: boolean = false) {
        this.age = age;
        this.selected = selected;
    }
}