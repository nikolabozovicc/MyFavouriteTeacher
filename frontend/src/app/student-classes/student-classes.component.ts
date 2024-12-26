import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { Classes } from '../models/classes';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit{
  
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private classesService: ClassesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null || this.user.type != 'teacher'){
      this.router.navigate([''])
    }
    else{
      let username = this.activatedRouter.snapshot.paramMap.get("username")
      if (username == null) {
        this.router.navigate([''])
      }
      else{
        this.classesService.getPastStudentClasses(this.user.username, username).subscribe((cls: Classes[]) => {
          this.classes = cls
        })
      }
    }
  }

  user: User
  classes: Classes[] = []
  message = ''

  rateStudent(id, username, grade, comment){
    if(grade == undefined || grade > 5 || grade < 1){
      this.message = 'Ocena mora biti od 1-5'
      return
    }
    this.classesService.rateStudent(id, username, grade, comment).subscribe((respObj) => {
      this.message = respObj['message']
    })
  }

}
