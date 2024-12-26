import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ClassesService } from '../services/classes.service';
import { Classes } from '../models/classes';

@Component({
  selector: 'app-classes-teacher',
  templateUrl: './classes-teacher.component.html',
  styleUrls: ['./classes-teacher.component.css']
})
export class ClassesTeacherComponent implements OnInit{

  constructor(private router: Router, private notificationService: NotificationService, private classesService: ClassesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    }
    else{
      this.classesService.getFiveClasses(this.user.username).subscribe((cls: Classes[]) => {
        this.classes = cls
      })
      this.classesService.getRequests(this.user.username).subscribe((req: Classes[]) => {
        this.requests = req
      })
    }
  }

  user: User
  requests: Classes[] = []
  classes: Classes[] = []
  message = ''

  acceptRequest(id, subject, dateAndTime, username, reason){
    this.classesService.acceptRequest(id).subscribe((respObj) => {
      this.message = respObj['message']
      this.notificationService.addNotification('Prihvacen cas', subject, dateAndTime, username, this.user.username, reason)
        .subscribe((respObj) => {
          this.ngOnInit()
        })
    })
  }

  rejectRequest(id, subject, dateAndTime, username, reason){
    this.classesService.rejectRequest(id).subscribe((respObj) => {
      this.message = respObj['message']
      this.notificationService.addNotification('Odbijen cas', subject, dateAndTime, username, this.user.username, reason)
        .subscribe((respObj) => {
          this.ngOnInit()
        })
    })
  }

  averageValue(grades: number[]){
    if(grades.length > 2){
      let sum = 0
      grades.forEach((grade) => {
        sum += grade
      })
      return sum / grades.length
    }
    else{
      return ''
    }
  }

  fifteenMinutes(classTime){
    let fifteenBeforeClass: Date = new Date(classTime)
    fifteenBeforeClass.setHours(fifteenBeforeClass.getHours() - 1)
    fifteenBeforeClass.setMinutes(fifteenBeforeClass.getMinutes() - 15)
    let now: Date = new Date()
    if(now >= fifteenBeforeClass){
      return true
    }
    else{
      return false
    }
  }

}
