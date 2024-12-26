import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router) { }

  ngOnInit(): void{
  }

  login(){
    this.router.navigate(['login'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  isLogedIn(){
    let user = JSON.parse(localStorage.getItem('user'))
    if(user != null){
      return true
    }
    else{
      return false
    }
  }

  userType(){
    let user: User = JSON.parse(localStorage.getItem('user'))
    if(user != null){
      if(user.type == 'student'){
        return 's'
      }
      else if(user.type == 'teacher'){
        return 't'
      }
      else return 'a'
    }
    else{
      return null
    }
  }

}
