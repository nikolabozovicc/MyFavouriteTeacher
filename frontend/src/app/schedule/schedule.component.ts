import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ClassesService } from '../services/classes.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private userService: UserService, 
    private classesService: ClassesService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null || this.user.type != 'student'){
      this.router.navigate([''])
    }
    else{
      let username = this.activatedRouter.snapshot.paramMap.get("username")
      if (username == null) {
        this.router.navigate([''])
      }
      this.userService.getUser(username).subscribe((teacher: User) => {
        this.teacher = teacher
        this.url = `http://localhost:4000/${this.teacher.profilePic}`
        if(teacher.subjects == null){
          this.subject = ''
        }
        else {
          this.subject = teacher.subjects[0].name
        }
      })
    }
  }

  user: User
  teacher: User
  url: string

  subject: string
  classDateString: string
  classDate: Date
  description: string
  doubleClass: boolean = false
  message: string = ''

  requestClass(){
    if(this.subject == ''){
      this.message = 'Izaberite predmet'
      return
    }
    if(this.classDateString == undefined || this.classDateString == ''){
      this.message = 'Izaberite datum i vreme'
      return
    }
    if(this.description == undefined || this.description == ''){
      this.message = 'Unesite temu casa'
      return
    }
    this.classDate = new Date(this.classDateString)
    
    let endTime: Date = new Date(this.classDateString)
    if(!this.doubleClass){
      endTime.setHours(this.classDate.getHours() + 1)
    }
    else{
      endTime.setHours(this.classDate.getHours() + 2)
    }
    if(this.classDate.getDay() == 6 || this.classDate.getDay() == 0){
      this.message = 'Nastavnik nije dostupan vikendom'
      return
    }
    if(this.classDate.getHours() < 10 || this.classDate.getHours() > 17 || (endTime.getHours() > 17 && endTime.getMinutes() > 0)){
      this.message = 'Nastavnik je dostupan izmedju 10:00 i 18:00'
      return
    }
    console.log(this.classDate)
    this.classesService.requestClass(this.subject, this.classDate, this.description, this.user.username, 
      this.user.name, this.user.lastName, this.teacher.username, this.user.studentGrades, endTime).subscribe((resp) => {
        this.message = resp['message']
      })

  }


}
