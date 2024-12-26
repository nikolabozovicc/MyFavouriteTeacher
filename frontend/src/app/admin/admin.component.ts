import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private router: Router, private userService: UserService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null || this.user.type != 'admin'){
      this.router.navigate([''])
    }
    else {
      this.userService.getAllStudents().subscribe((s: User[]) => {
        this.students = s
      })
      this.userService.getAllTeachers().subscribe((t: User[]) => {
        this.teachers = t
        this.teachers.forEach((teacher) => {
          let url = `http://localhost:4000/${teacher.cv}`
          teacher.cv = url
        })
      })
      this.userService.getAllRequests().subscribe((r: User[]) => {
        this.requests = r
        this.requests.forEach((req) => {
          let url = `http://localhost:4000/${req.cv}`
          req.cv = url
        })
      })
      this.subjectService.getRequests().subscribe((req: Subject[]) => {
        this.subjectRequests = req
      })
    }
    this.message = ''
  }

  students: User[]
  teachers: User[]
  requests: User[]
  user: User
  newSubject: string
  subjectRequests: Subject[] = []
  message: string = ''

  acceptRequest(username, subjects: Subject[]){
    this.userService.acceptRequest(username).subscribe((respObj) => {
      console.log(respObj)
      console.log(subjects)
      let subString: string[] = []
      this.subjectService.getAllSubjects().subscribe((sub: Subject[]) => {
        sub.forEach((subject) => {
          subString.push(subject.name)
        })
        console.log(subString)
        subjects.forEach((subject) => {
          if(!subString.includes(subject.name)){
            this.subjectService.addNewSubject(subject.name).subscribe((respObj) => {
              this.message = respObj['message']
            })
          }
          else{
            this.subjectService.updateSubject(subject.name).subscribe((respObj) => {
              this.message = respObj['message']
            })
          }
        })
        this.ngOnInit()
      })
    })
  }

  rejectRequest(username){
    this.userService.rejectRequest(username).subscribe((respObj) => {
      this.message = respObj['message']
      this.ngOnInit()
    })
  }

  addNewSubject(){
    this.subjectService.addNewSubject(this.newSubject).subscribe((respObj) => {
      this.message = respObj['message']
    })
  }

  acceptSubject(name){
    this.subjectService.acceptSubject(name).subscribe((respObj) => {
      this.message = respObj['message']
      this.ngOnInit()
    })
  }

  rejectSubject(name){
    this.subjectService.rejectSubject(name).subscribe((respObj) => {
      this.message = respObj['message']
      this.ngOnInit()
    })
  }

  deactivateTeacher(username){
    this.userService.deactivateTeacher(username).subscribe((respObj) => {
      this.message = respObj['message'] 
      this.ngOnInit()
    })
  }

}
