import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    localStorage.clear()
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if(user != null){
        if(user.type == "student"){
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['student'])
        }
        else if(user.type == "teacher"){
          if(user.status == "active"){
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['teacher'])
          }
          else{
            this.message = "Uneli ste pogresne podatke"
          }
        }
        else{
          this.message = "Uneli ste pogresne podatke"
        }
      }
      else{
        this.message = "Uneli ste pogresne podatke"
      }
    })
  }

}
