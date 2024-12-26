import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  requestClass(subject, dateAndTime, description, username, name, lastName, teacher, studentGrades, endTime){
    const data = {
      subject: subject,
      dateAndTime: dateAndTime,
      description: description,
      username: username,
      name: name,
      lastName: lastName,
      teacher: teacher,
      studentGrades: studentGrades,
      endTime: endTime,
      status: 'request'
    }
    return this.http.post(`${this.uri}/classes/requestClass`, data)
  }

  getRequests(teacher){
    const data = {
      teacher: teacher,
      status: 'request'
    }
    return this.http.post(`${this.uri}/classes/getRequests`, data)
  }
  
  acceptRequest(_id){
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/classes/acceptRequest`, data)
  }

  rejectRequest(_id){
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/classes/rejectRequest`, data)
  }

  getFiveClasses(teacher){
    const data = {
      teacher: teacher
    }
    return this.http.post(`${this.uri}/classes/getFiveClasses`, data)
  }

  getPastClasses(teacher){
    const data = {
      teacher: teacher
    }
    return this.http.post(`${this.uri}/classes/getPastClasses`, data)
  }

  getPastStudentClasses(teacher, username){
    const data = {
      teacher: teacher,
      username: username
    }
    return this.http.post(`${this.uri}/classes/getPastStudentClasses`, data)
  }

  rateStudent(_id, username, grade, comment){
    const data = {
      _id: _id,
      username: username,
      grade: grade,
      comment: comment
    }
    return this.http.post(`${this.uri}/classes/rateStudent`, data)
  }

  getArchiveClasses(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/classes/getArchiveClasses`, data)
  }
  
  getFutureClasses(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/classes/getFutureClasses`, data)
  }

  countWeek(){
    return this.http.get(`${this.uri}/classes/countWeek`)
  }

  countMonth(){
    return this.http.get(`${this.uri}/classes/countMonth`)
  }

  getAllPastClasses(){
    return this.http.get(`${this.uri}/classes/getAllPastClasses`)
  }

}
