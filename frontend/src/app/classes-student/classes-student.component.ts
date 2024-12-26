import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { User } from '../models/user';
import { Classes } from '../models/classes';

@Component({
  selector: 'app-classes-student',
  templateUrl: './classes-student.component.html',
  styleUrls: ['./classes-student.component.css']
})
export class ClassesStudentComponent implements OnInit{

  constructor(private router: Router, private classesService: ClassesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    } else{
      this.classesService.getArchiveClasses(this.user.username).subscribe((cls: Classes[]) => {
        this.archive = cls
      })
      this.classesService.getFutureClasses(this.user.username).subscribe((cls: Classes[]) => {
        this.future = cls
      })
    }
  }

  user: User
  archive: Classes[] = []
  future: Classes[] = []

  fifteenMinutes(classTime){
    let fifteenBeforeClass: Date = new Date(classTime)
    fifteenBeforeClass.setHours(fifteenBeforeClass.getHours() - 1)
    fifteenBeforeClass.setMinutes(fifteenBeforeClass.getMinutes() - 15)
    let now: Date = new Date()
    if(now >= fifteenBeforeClass){
      return true
    }
    else{
      return false
    }
  }

}
