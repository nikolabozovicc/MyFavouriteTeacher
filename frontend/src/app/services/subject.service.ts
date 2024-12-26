import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  addNewSubject(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/subjects/addNewSubject`, data)
  }

  getAllSubjects(){
    return this.http.get(`${this.uri}/subjects/getAllSubjects`)
  }

  updateSubject(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/subjects/updateSubject`, data)
  }

  updateSubjectDecrease(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/subjects/updateSubjectDecrease`, data)
  }

  subjectRequest(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/subjects/subjectRequest`, data)
  }

  getRequests(){
    return this.http.get(`${this.uri}/subjects/getRequests`)
  }

  acceptSubject(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/subjects/acceptSubject`, data)
  }

  rejectSubject(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/subjects/rejectSubject`, data)
  }
}
