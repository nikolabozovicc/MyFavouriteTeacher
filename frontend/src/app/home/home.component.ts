import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Teacher } from '../models/teacher';
import { ClassesService } from '../services/classes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private router: Router, private userService: UserService, private classesService: ClassesService) { }

  ngOnInit(): void {
    this.userService.getAllStudents().subscribe((students: User[]) => {
      this.numberOfStudents = students.length
    })
    this.userService.getAllActiveTeachers().subscribe((teachers: User[]) => {
      this.numberOfActiveTeachers = teachers.length
      teachers.forEach((teacher) => {
        teacher.subjects.forEach((subject) => {
          this.teachers.push(new Teacher(teacher.username, teacher.name, teacher.lastName, subject.name))
        })
      })
      this.tempTeachers = this.teachers
    })
    this.classesService.countWeek().subscribe((cnt: number) => {
      this.numberOfClassesWeek = cnt
    })
    this.classesService.countMonth().subscribe((cnt: number) => {
      this.numberOfClassesMonth = cnt
    })
  }

  numberOfStudents: number
  numberOfActiveTeachers: number

  numberOfClassesWeek: number
  numberOfClassesMonth: number

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


}
