import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    console.log('student ngOnInit metoda pozvana')
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    }
    else{
      if(this.user.level == 4 && this.user.school != 'osnovna'){
        this.maxLevel = true
      }
      if(this.user.school != 'osnovna'){
        this.chooseSchool = true
      }
      this.clicked = false
      this.updateFields = false
      this.message = ''
    }
    this.url = `http://localhost:4000/${this.user.profilePic}`
  }

  user: User

  url: string

  updateFields: boolean = false

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

  name: string
  lastName: string
  adress: string
  email: string
  phone: string
  school: string
  level: number
  profilePic

  message: string

  maxLevel: boolean = false

  chooseSchool: boolean = false

  clicked: boolean = false

  levelUp(){
    this.clicked = true
    if(this.user.level == 8 && this.user.school == 'osnovna'){
      this.chooseSchool = true
      this.school = 'srednja-gimnazija'
      this.level = this.user.level = 1
    }
    else{
      this.level = ++this.user.level
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
    let school = (this.school == undefined || this.school == '') ? this.user.school : this.school
    let level = (this.level == undefined) ? this.user.level : this.level

    this.userService.saveUpdate(this.user.username, name, lastName, adress, email, phone, this.school,
      level).subscribe((respObj)=>{
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
                this.router.navigate(['/student'])
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
              this.router.navigate(['/student'])
              this.ngOnInit()
            })
          }
        }
        else{
          this.message = respObj['message']
        }
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
