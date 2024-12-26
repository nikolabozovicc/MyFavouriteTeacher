import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { User } from '../models/user';
import { Classes } from '../models/classes';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.css']
})
export class MyStudentsComponent implements OnInit{

  constructor(private router: Router, private classesService: ClassesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    }
    else{
      this.classesService.getPastClasses(this.user.username).subscribe((cls: Classes[]) => {
        this.classes = cls
        cls.forEach((c) => {
          this.students.push({
            username: c.username,
            name: c.name,
            lastName: c.lastName
          })
        })
        this.students = this.students.filter((student, index, self) => (
          index === self.findIndex((s) =>
            s.username === student.username &&
            s.name === student.name &&
            s.lastName === student.lastName
          )
        ))
      })
    }
  }

  user: User
  classes: Classes[] = []
  students: {
    username: string
    name: string
    lastName: string
  }[] = []

  goToStudentClasses(username){
    this.router.navigate(["studentClasses", {username: username}])
  }

}
