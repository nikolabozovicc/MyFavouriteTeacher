import { Component, OnInit } from '@angular/core';
import { Subject } from '../models/subject';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Age } from '../models/age';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  constructor(private router: Router, private userService: UserService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((sub: Subject[]) => {
      this.subjects = sub
    })
  }

  currentStep: number = 1;

  nextStep() {
    // Move to the next step
    this.currentStep++;
  }

  previousStep() {
    // Move to the next step
    this.currentStep--;
  }

  subjects: Subject[] = []

  selectedSubjects: Subject[] = []
  bonusSubject: string
  bonusSubjectCheck: boolean

  // subjects: string[] = ['Matematika', 'Fizika', 'Hemija', 'Informatika', 'Programiranje', 
  // 'Srpski jezik i knjizevnost', 'Engleski jezik', 'Nemacki jezik', 'Italijanski jezik', 
  // 'Francuski jezik', 'Spanski jezik', 'Latinski jezik', 'Biologija', 'Istorija', 'Geografija',
  // 'Svet oko nas'];

  ages: Age[] = [
    new Age("Osnovna skola 1-4. razred"), new Age("Osnovna skola 5-8. razred"), new Age("Srednja skola")
  ]
  
  desiredAge: Age[] = []

  fromWhereQuestion: string

  profilePic = null;
  cv = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log("slika:" + input.files[0])
      if (input.files && input.files.length > 0){
        const file = input.files[0];
        this.profilePic = file;
    }
    
  }

  onFileSelectedCv(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log("Cv:" + input.files[0])
      if (input.files && input.files.length > 0){
        const file = input.files[0];
        this.cv = file;
    }
    
  }

  async request(){
    for(let subject of this.subjects){
      if(subject.selected){
        this.selectedSubjects.push(subject);
      }
    }
    let subjectString: string [] = []
    this.subjects.forEach((subject) => {
      subjectString.push(subject.name)
    })
    if(this.bonusSubjectCheck && this.bonusSubject != undefined && this.bonusSubject != ''){
      if(subjectString.includes(this.bonusSubject)){
        this.message = 'Novi predmet koji zelite da dodate vec postoji u listi ponudjenih'
        return
      }
      this.selectedSubjects.push(new Subject(this.bonusSubject));
    }
    for(let age of this.ages){
      if(age.selected){
        this.desiredAge.push(age);
      }
    }
    let teacherValidation = await this.teacherValidations()
    if(teacherValidation == false){
      return;
    }

    this.userService.request(this.username, this.password, this.secQuestion, this.secAnswer,
      this.name, this.lastName, this.sex, this.adress, this.phone, this.email,
      this.selectedSubjects, this.desiredAge, this.fromWhereQuestion).subscribe((respObj) => {
        if(respObj['message'] =='user added'){
          const formdataCv = new FormData()
          formdataCv.append('cv', this.cv)
          formdataCv.append('username', this.username)
          this.userService.setCv(formdataCv).subscribe((respObj) => {
            console.log(respObj);
            if(this.profilePic != null){
              const formdata = new FormData()
              formdata.append('profilePic', this.profilePic)
              formdata.append('username', this.username)
              this.userService.setPicture(formdata).subscribe((respObj) => {
                console.log(respObj);
                this.router.navigate([''])
              })
            }
            else{
              this.router.navigate([''])
            }
          })
        }
        else{
          this.message = respObj['message']
        }
      })
  }

  role: string
  username: string
  password: string
  secQuestion: string
  secAnswer: string
  name: string
  lastName: string
  sex: string
  adress: string
  phone: string
  email: string
  school: string
  level: number

  message: string

  async register(){
    let studentValidation = await this.studentValidations()
    if(studentValidation == false){
      return;
    }
    this.userService.register(this.username, this.password, this.secQuestion, this.secAnswer,
      this.name, this.lastName, this.sex, this.adress, this.phone, this.email, this.school, this.level).subscribe((respObj) => {
        if(respObj['message'] =='user added'){
          if(this.profilePic != null){
            const formdata = new FormData()
            formdata.append('profilePic', this.profilePic)
            formdata.append('username', this.username)
            this.userService.setPicture(formdata).subscribe((respObj) => {
              console.log(respObj);
              this.router.navigate([''])
            })
          }
          else{
            this.router.navigate([''])
          }
          
        }
        else{
          this.message = respObj['message']
        }
        
      })
  }

  async studentValidations(): Promise<boolean>{
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z].{5,9}$/;
    if(!passwordRegex.test(this.password)){
      this.message = 'Lozinka mora sadrzati izmedju 6 i 10 karaktera, bar 1 veliko slovo, 3 mala,'
      + ' 1 broj i 1 specijalan karakter i mora pocinjati slovom.'
      return false
    }
    if (!this.username || !this.password || !this.secQuestion || !this.secAnswer || !this.name ||
       !this.lastName || !this.sex || !this.adress || !this.phone || !this.email || !this.school || !this.level) {
      this.message = "Nedostaju neka obavezna polja";
      return false;
    }
    if (this.username.length == 0 || this.password.length == 0 || this.secQuestion.length == 0 || this.secAnswer.length == 0 ||
       this.name.length == 0 || this.lastName.length == 0 || this.adress.length == 0 || this.phone.length == 0 || 
       this.email.length == 0 || this.school.length == 0) {
     this.message = "Nedostaju neka obavezna polja";
     return false;
   }
    if (this.level <= 0 || this.level > 8 || this.level > 4 && (this.school != 'osnovna')) {
      this.message = 'Neodgovarajuc razred'
      return false
    }
    if (this.profilePic) {
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(this.profilePic.type)) {
        this.message = 'Slika mora biti u JPG ili PNG formatu'
        return false
      } 
    }
    const isProfilePicValid: boolean = await this.goodImageDimensions()
    if(!isProfilePicValid){
      this.message = 'Minimalna velicina slike je 100x100px, a maksimalna 300x300px'
      return false
    }
   return true;
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

  async teacherValidations(): Promise<boolean>{
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z].{5,9}$/
    if(!passwordRegex.test(this.password)){
      this.message = 'Lozinka mora sadrzati izmedju 6 i 10 karaktera, bar 1 veliko slovo, 3 mala,'
      + ' 1 broj i 1 specijalan karakter i mora pocinjati slovom.'
      return false
    }
    if (!this.username || !this.password || !this.secQuestion || !this.secAnswer || !this.name ||
       !this.lastName || !this.sex || !this.adress || !this.phone || !this.email || !this.fromWhereQuestion) {
      this.message = "Nedostaju neka obavezna polja";
      return false;
    }
    if (this.username.length == 0 || this.password.length == 0 || this.secQuestion.length == 0 || this.secAnswer.length == 0 ||
       this.name.length == 0 || this.lastName.length == 0 || this.adress.length == 0 || this.phone.length == 0 || 
       this.email.length == 0 || this.fromWhereQuestion.length == 0 || this.selectedSubjects.length == 0 || this.desiredAge.length == 0) {
     this.message = "Nedostaju neka obavezna polja";
     return false;
   }
    if (this.profilePic) {
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(this.profilePic.type)) {
        this.message = 'Slika mora biti u JPG ili PNG formatu'
        return false
      } 
    }
    const isProfilePicValid: boolean = await this.goodImageDimensions()
    if(!isProfilePicValid){
      this.message = 'Minimalna velicina slike je 100x100px, a maksimalna 300x300px'
      return false
    }
    if (this.cv) {
      const allowedMimeTypes = ['application/pdf'];
      if (this.cv.type != allowedMimeTypes) {
        this.message = 'CV mora biti u PDF formatu'
        return false
      } 
    }
    else{
      this.message = 'Nedostaju neka obavezna polja'
      return false
    }
    const maxSizeInBytes = 3 * 1024 * 1024
    if(this.cv.size > maxSizeInBytes){
      this.message = 'PDF mora biti manji od 3MB'
      return false
    }
   return true;
  }

}
