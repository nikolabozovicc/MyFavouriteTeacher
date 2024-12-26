import { Component, OnInit } from '@angular/core';
import { Teacher } from '../models/teacher';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-myteachers',
  templateUrl: './myteachers.component.html',
  styleUrls: ['./myteachers.component.css']
})
export class MyteachersComponent implements OnInit{

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    }
    else{
      let age: string
      if(this.user.school == 'osnovna'){
        if(this.user.level > 4){
          age = 'Osnovna skola 5-8. razred'
        }
        else {
          age = 'Osnovna skola 1-4. razred'
        }
      }
      else{
        age = 'Srednja skola'
      }
      this.userService.getAllAgeTeachers(age).subscribe((teachers: User[]) => {
        teachers.forEach((teacher) => {
          teacher.subjects.forEach((subject) => {
            this.teachers.push(new Teacher(teacher.username, teacher.name, teacher.lastName, subject.name))
          })
        })
        this.tempTeachers = this.teachers
      })
    }
  }

  user: User
  teachers: Teacher[] = []
  tempTeachers: Teacher[] = []

  name: string = ''
  lastName: string = ''
  subject: string = ''

  search(){
    this.tempTeachers = this.teachers
    this.tempTeachers = this.tempTeachers.filter(teacher => teacher.name.toLowerCase().includes(this.name.toLowerCase()) &&
     teacher.lastName.toLowerCase().includes(this.lastName.toLowerCase()) && teacher.subject.toLowerCase().includes(this.subject.toLowerCase()))
  }

  upNameSort(){
    this.tempTeachers.sort((teacher1, teacher2) => {
      if(teacher1.name > teacher2.name) return 1
      else if(teacher1.name == teacher2.name) return 0
      else return -1
    })
  }

  downNameSort(){
    this.tempTeachers.sort((teacher1, teacher2) => {
      if(teacher1.name < teacher2.name) return 1
      else if(teacher1.name == teacher2.name) return 0
      else return -1
    })
  }

  upLastNameSort(){
    this.tempTeachers.sort((teacher1, teacher2) => {
      if(teacher1.lastName > teacher2.lastName) return 1
      else if(teacher1.lastName == teacher2.lastName) return 0
      else return -1
    })
  }

  downLastNameSort(){
    this.tempTeachers.sort((teacher1, teacher2) => {
      if(teacher1.lastName < teacher2.lastName) return 1
      else if(teacher1.lastName == teacher2.lastName) return 0
      else return -1
    })
  }

  upSubjectSort(){
    this.tempTeachers.sort((teacher1, teacher2) => {
      if(teacher1.subject > teacher2.subject) return 1
      else if(teacher1.subject == teacher2.subject) return 0
      else return -1
    })
  }

  downSubjectSort(){
    this.tempTeachers.sort((teacher1, teacher2) => {
      if(teacher1.subject < teacher2.subject) return 1
      else if(teacher1.subject == teacher2.subject) return 0
      else return -1
    })
  }

  goToSchedule(username){
    this.router.navigate(["schedule", {username: username}])
  }

}
