import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.css']
})
export class PassChangeComponent implements OnInit{
  
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user == null){
      this.router.navigate([''])
    }
  }

  message: string;
  user: User
  oldPass: string
  newPass: string
  repeatPass: string

  change(){
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z].{5,9}$/
    if(!passwordRegex.test(this.newPass)){
      this.message = 'Lozinka mora sadrzati izmedju 6 i 10 karaktera, bar 1 veliko slovo, 3 mala,'
      + ' 1 broj i 1 specijalan karakter i mora pocinjati slovom.'
      return
    }
    if (this.newPass != this.repeatPass){
      this.message = "Lozinke se ne poklapaju";
      return
    }
    this.userService.login(this.user.username, this.oldPass).subscribe((respObj: User) => {
      if(respObj){
        this.userService.changePass(this.user.username, this.newPass).subscribe((respObj) => {
          if(respObj['message'] == 'password changed'){
            this.router.navigate(['login'])
          }
          else{
            this.message = 'Greska prilikom promene u bazi'
          }
        })
      }
      else{
        this.message = 'Stara lozinka nije validna'
      }
    })
  }

}
