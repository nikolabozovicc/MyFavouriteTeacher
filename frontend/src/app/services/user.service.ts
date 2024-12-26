import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/login`, data)
  }

  adminLogin(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/adminLogin`, data)
  }

  register(username, password, securityQuestion, securityAnswer, name, lastName, sex, adress, phone, email, school, level){
    const data = {
      username: username,
      password: password,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer,
      name: name,
      lastName: lastName,
      sex: sex,
      adress: adress,
      phone: phone,
      email: email,
      profilePic: 'placeholder',
      school: school,
      level: level,
      type: 'student'
    }
    return this.http.post(`${this.uri}/users/register`, data)
  }

  request(username, password, securityQuestion, securityAnswer, name, lastName, sex, adress, phone, email,
    subjects, desiredAge, fromWhereQuestion){
      const data = {
        username: username,
        password: password,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
        name: name,
        lastName: lastName,
        sex: sex,
        adress: adress,
        phone: phone,
        email: email,
        profilePic: 'placeholder',
        cv: 'placeholder',
        subjects: subjects,
        desiredAge: desiredAge,
        fromWhereQuestion: fromWhereQuestion,
        type: 'teacher',
        status: 'request'
      }
      return this.http.post(`${this.uri}/users/register`, data)
  }

  setPicture(profilePic){
    return this.http.post(`${this.uri}/users/setPicture`, profilePic)
  }

  setCv(cv){
    return this.http.post(`${this.uri}/users/setCv`, cv)
  }

  changePass(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/changePass`, data)
  }

  saveUpdate(username, name, lastName, adress, email, phone, school, level){
    const data = {
      username: username,
      name: name,
      lastName: lastName,
      adress: adress,
      email: email,
      phone: phone,
      school: school,
      level: level
    }
    return this.http.post(`${this.uri}/users/saveUpdate`, data)
  }

  setPictureAndDelete(profilePic){
    return this.http.post(`${this.uri}/users/setPictureAndDelete`, profilePic)
  }

  getUser(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/getUser`, data)
  }

  getAllTeachers(){
    return this.http.get(`${this.uri}/users/getAllTeachers`)
  }

  getAllRequests(){
    return this.http.get(`${this.uri}/users/getAllRequests`)
  }

  acceptRequest(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/acceptRequest`, data)
  }

  rejectRequest(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/rejectRequest`, data)
  }

  saveTeacherUpdate(username, name, lastName, adress, email, phone, subjects, desiredAge){
    const data = {
      username: username,
      name: name,
      lastName: lastName,
      adress: adress,
      email: email,
      phone: phone,
      subjects: subjects,
      desiredAge: desiredAge
    }
    return this.http.post(`${this.uri}/users/saveTeacherUpdate`, data)
  }

  getAllActiveTeachers(){
    return this.http.get(`${this.uri}/users/getAllActiveTeachers`)
  }

  getAllStudents(){
    return this.http.get(`${this.uri}/users/getAllStudents`)
  }

  getAllAgeTeachers(age){
    return this.http.get(`${this.uri}/users/getAllAgeTeachers?age=${age}`)
  }

  deactivateTeacher(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/deactivateTeacher`, data)
  }

}
