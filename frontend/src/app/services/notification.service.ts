import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'
  
  addNotification(title, subject, dateAndTime, username, teacher, reason){
    const data = {
      title: title,
      subject: subject,
      dateAndTime: dateAndTime,
      username: username,
      teacher: teacher,
      readed: false,
      reason: reason
    }
    return this.http.post(`${this.uri}/notifications/addNotification`, data)
  }

  getNotifications(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/notifications/getNotifications`, data)
  }

  markAsRead(_id){
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/notifications/markAsRead`, data)
  }

}
