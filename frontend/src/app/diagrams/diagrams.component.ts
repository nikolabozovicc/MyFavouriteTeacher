import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject';
import { UserService } from '../services/user.service';
import { ClassesService } from '../services/classes.service';
import { Classes } from '../models/classes';
import { TeacherChartData } from '../models/techerChartData';
import { ChartData } from '../models/chartData';

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit{
  
  constructor(private router: Router, private subjectService: SubjectService, private userService: UserService,
    private classesService: ClassesService) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null || this.user.type != 'admin'){
      this.router.navigate([''])
    }
    else{
      this.subjectService.getAllSubjects().subscribe((sub: Subject[]) => {
        let labels: string[] = []
        let data: number[] = []
        sub.forEach((subject => {
          labels.push(subject.name)
          data.push(subject.numberOfTeachers)
        }))
        this.teachersPerSubject(labels, data)
      })

      this.userService.getAllActiveTeachers().subscribe((t: User[]) => {
        let labels: string[] = ['Osnovna skola 1-4. razred', 'Osnovna skola 5-8. razred', 'Srednja skola']
        let data: number[] = [0, 0, 0]
        t.forEach((teacher) => {
          teacher.desiredAge.forEach((age) => {
            if(age.age == 'Osnovna skola 1-4. razred'){
              data[0]++
            }
            if(age.age == 'Osnovna skola 5-8. razred'){
              data[1]++
            }
            if(age.age == 'Srednja skola'){
              data[2]++
            }
          })
        })  
        this.teachersPerAge(labels, data)
      })

      this.userService.getAllActiveTeachers().subscribe((t: User[]) => {
        let labels: string[] = ['M', 'Z']
        let data: number[] = [0, 0]
        t.forEach((teacher) => {
          if(teacher.sex == 'M'){
            data[0]++
          }
          else{
            data[1]++
          }
        })
        this.teachersSex(labels, data)
      })

      this.userService.getAllStudents().subscribe((t: User[]) => {
        let labels: string[] = ['M', 'Z']
        let data: number[] = [0, 0]
        t.forEach((teacher) => {
          if(teacher.sex == 'M'){
            data[0]++
          }
          else{
            data[1]++
          }
        })
        this.studentsSex(labels, data)
      })

      this.classesService.getAllPastClasses().subscribe((cls: Classes[]) => {
        let labels: string[] = ['Ned', 'Pon', 'Uto', 'Sre', 'Cet', 'Pet', 'Sub']
        let data: number[] = [0, 0, 0, 0, 0, 0, 0]
        cls.forEach((c) => {
          let date = new Date(c.dateAndTime)
          data[date.getDay()]++
        })
        console.log(data)
        this.classesOnDays(labels, data)
      })

      this.userService.getAllActiveTeachers().subscribe((t: User[]) => {
        let labels: string[] = ['jan', 'feb', 'mart', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec']
        this.classesService.getAllPastClasses().subscribe((cls: Classes[]) => {
          let teacherDatas: TeacherChartData[] = []
          t.forEach((tea) => {
            teacherDatas.push(new TeacherChartData(tea.username))
          }) 
          cls.forEach((c) => {
            teacherDatas.forEach((tea) => {
              if(c.teacher == tea.username){
                tea.numOfClasses++
                let date = new Date(c.dateAndTime)
                tea.monthlyClasses[date.getMonth()]++
              }
            })
          })
          teacherDatas.sort((teacherData1, teacherData2) => {
            if(teacherData1.numOfClasses < teacherData2.numOfClasses){
              return -1
            }
            else if(teacherData1.numOfClasses == teacherData2.numOfClasses) return 0
            else return 1
          })
          console.log(teacherDatas)
          teacherDatas = teacherDatas.slice(0, 10)
          let chartData: ChartData[] = []
          teacherDatas.forEach((t) => {
            chartData.push(new ChartData(t.username, t.monthlyClasses))
          })
          this.monthlyClasses(labels, chartData)
        })
      })
    }
  }

  user: User

  teachersPerSubject(lab: string[], dat: number[]){
    const ctx = document.getElementById('teachersPerSubject') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: lab,
          datasets: [{
            label: 'Broj nastavnika po predmetu',
            data: dat,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  teachersPerAge(lab: string[], dat: number[]){
    const ctx = document.getElementById('teachersPerAge') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: lab,
          datasets: [{
            label: 'Broj nastavnika po uzrastu',
            data: dat,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  teachersSex(lab: string[], dat: number[]){
    const ctx = document.getElementById('teachersSex') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: lab,
          datasets: [{
            label: 'Pol nastavanika',
            data: dat,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  studentsSex(lab: string[], dat: number[]){
    const ctx = document.getElementById('studentsSex') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: lab,
          datasets: [{
            label: 'Pol ucenika',
            data: dat,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  classesOnDays(lab: string[], dat: number[]){
    const ctx = document.getElementById('classesOnDays') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: lab,
          datasets: [{
            label: 'Broj casova po danima',
            data: dat,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          } 
        }
      });
  }

  monthlyClasses(lab: string[], dat){
    const ctx = document.getElementById('monthlyClasses') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: lab,
          datasets: dat
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        } 
      });
  }

}
