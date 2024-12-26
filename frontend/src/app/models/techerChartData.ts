export class TeacherChartData{
    username: string
    numOfClasses: number
    monthlyClasses: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    constructor(username){
        this.username = username
    }
}