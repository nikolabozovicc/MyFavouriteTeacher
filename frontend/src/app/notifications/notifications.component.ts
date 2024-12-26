import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    } 
    else{
      this.notificationService.getNotifications(this.user.username).subscribe((n: Notification[]) => {
        this.notifications = n
      })
      this.show = false
    }
  }

  user: User
  notifications: Notification[] = []
  show: boolean = false

  title
  subject
  dateAndTime
  reason

  read(_id, title, subject, dateAndTime, reason){
    this.title = title
    this.subject = subject
    this.dateAndTime = dateAndTime
    this.reason = reason
    this.show = true
    this.notificationService.markAsRead(_id).subscribe((respObj) => {
      this.notifications.forEach((n) => {
        if(n._id == _id){
          n.readed = true
        }
      })
    })
  }

}
