import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Age } from '../models/age';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit{

  constructor(private router: Router, private userService: UserService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    }
    else{
      this.updateFields = false
      this.url = `http://localhost:4000/${this.user.profilePic}`
      let selectedSubjectStrings: string[] = []
      this.user.subjects.forEach((subject) => {
        selectedSubjectStrings.push(subject.name)
      })  
      this.subjectService.getAllSubjects().subscribe((sub: Subject[]) => {
        this.subjects = sub
        this.subjects.forEach((subject) => {
          if(selectedSubjectStrings.includes(subject.name)){
            subject.selected = true
          }
        })
        console.log(this.subjects)
      })
      let selectedAgeString: string[] = []
      this.user.desiredAge.forEach((age) => {
        selectedAgeString.push(age.age)
      })
      this.ages.forEach((age) => {
        if(selectedAgeString.includes(age.age)){
          age.selected = true
        }
      })
    }
    this.message = ''
  }

  user: User
  url: string
  updateFields: boolean = false

  subjects: Subject[] = []

  bonusSubject: string
  bonusSubjectCheck: boolean

  ages: Age[] = [
    new Age("Osnovna skola 1-4. razred"), new Age("Osnovna skola 5-8. razred"), new Age("Srednja skola")
  ]
  
  desiredAge: Age[] = []

  name: string
  lastName: string
  adress: string
  email: string
  phone: string
  selectedSubjects: Subject[] = []
  desiredAges: string
  profilePic

  message: string

  update(){
    this.updateFields = true
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log("slika:" + input.files[0])
      if (input.files && input.files.length > 0){
        const file = input.files[0];
        this.profilePic = file;
    }
    
  }

  async saveUpdate(){
    if (this.profilePic) {
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(this.profilePic.type)) {
        this.message = 'Slika mora biti u JPG ili PNG formatu'
        return
      } 
    }
    const isProfilePicValid: boolean = await this.goodImageDimensions()
    if(!isProfilePicValid){
      this.message = 'Minimalna velicina slike je 100x100px, a maksimalna 300x300px'
      return
    }

    let name = (this.name == undefined || this.name == '') ? this.user.name : this.name 
    let lastName = (this.lastName == undefined || this.lastName == '') ? this.user.lastName : this.lastName 
    let adress = (this.adress == undefined || this.adress == '') ? this.user.adress : this.adress 
    let email = (this.email == undefined || this.email == '') ? this.user.email : this.email 
    let phone = (this.phone == undefined || this.phone == '') ? this.user.phone : this.phone

    let subjectString: string [] = []
    this.subjects.forEach((subject) => {
      subjectString.push(subject.name)
    })
    if(this.bonusSubjectCheck && this.bonusSubject != undefined && this.bonusSubject != ''){
      if(subjectString.includes(this.bonusSubject)){
        this.message = 'Novi predmet koji zelite da dodate vec postoji u listi ponudjenih'
        return
      }
      this.subjectService.subjectRequest(this.bonusSubject).subscribe((respObj) => {
        console.log(respObj)
      })
    }

    for(let subject of this.subjects){
      if(subject.selected){
        this.selectedSubjects.push(subject);
      }
    }

    let oldSubStrings: string[] = []
    let newSubStrings: string[] = []
    this.user.subjects.forEach((subject) => {
      oldSubStrings.push(subject.name)
    })
    this.selectedSubjects.forEach((subject) => {
      newSubStrings.push(subject.name)
    })
    for(let oldSub of oldSubStrings){
      if(!newSubStrings.includes(oldSub)){
        this.subjectService.updateSubjectDecrease(oldSub).subscribe((respObj) => {
          console.log(respObj)
        })
      }
    }
    for(let newSub of newSubStrings){
      if(!oldSubStrings.includes(newSub)){
        this.subjectService.updateSubject(newSub).subscribe((respObj) => {
          console.log(respObj)
        })
      }
    }

    for(let age of this.ages){
      if(age.selected){
        this.desiredAge.push(age);
      }
    }

    this.userService.saveTeacherUpdate(this.user.username, name, lastName, adress, email, phone, 
      this.selectedSubjects, this.desiredAge).subscribe((respObj) => {
        if(respObj['message'] =='user updated'){
          if(this.profilePic != null){
            const formdata = new FormData()
            formdata.append('profilePic', this.profilePic)
            formdata.append('username', this.user.username)
            this.userService.setPictureAndDelete(formdata).subscribe((respObj) => {
              console.log(respObj);
              this.message = respObj['message']
              this.userService.getUser(this.user.username).subscribe((u: User) => {
                localStorage.clear()
                localStorage.setItem('user', JSON.stringify(u))
                this.user = u
                this.updateFields = false;
                this.router.navigate(['/teacher'])
                this.ngOnInit()
              })
            })
          }
          else {
            this.userService.getUser(this.user.username).subscribe((u: User) => {
              localStorage.clear()
              localStorage.setItem('user', JSON.stringify(u))
              this.user = u
              this.updateFields = false;
              this.router.navigate(['/teacher'])
              this.ngOnInit()
            })
          }
        }
        else{
          this.message = respObj['message']
        }
        this.selectedSubjects = []
        this.desiredAge = []
      })

  }

  async goodImageDimensions(): Promise<boolean> {
    if (!this.profilePic) {
      return true;
    }
    const image = new Image();
    image.src = URL.createObjectURL(this.profilePic);

    const loaded = new Promise<void>((resolve) => {
      image.onload = () => resolve();
    });
  
    // Wait for the image to be loaded before checking dimensions
      await loaded
      // Retrieve the width and height of the loaded image
      const width = image.width;
      const height = image.height;
  
      // Check if the image dimensions are within the specified boundaries
      const isValid = width >= 100 && width <= 300 && height >= 100 && height <= 300;
  
      // Log the dimensions for debugging purposes
      console.log(`Width: ${width}, Height: ${height}, isValid: ${isValid}`);
      return isValid
    
  }

}
