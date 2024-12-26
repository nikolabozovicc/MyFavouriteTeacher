import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit{

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.adminLogin(this.username, this.password).subscribe((user: User) => {
      if(user != null){
        if(user.type == "admin"){
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['admin'])
        }
        else {
          this.message = "Uneli ste pogresne podatke"
        }
      }
      else{
        this.message = "Uneli ste pogresne podatke"
      }
    })
  }

}
