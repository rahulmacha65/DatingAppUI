import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Observable,of } from 'rxjs';
import { IUser } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,DoCheck {


  userName:string="";
  profilePhoto:string="";

  constructor(public _loginService:AccountService,private route:Router) {}

  ngDoCheck(): void {
    const user = localStorage.getItem('user')
    if(!user) return;
    const parsedUser = JSON.parse(user);
    this.userName = parsedUser.knownAs;
    this.profilePhoto = parsedUser.photoUrl

  }

  ngOnInit(): void {
    
  }

  
  logout(){
    this.userName="";
    this._loginService.userLogout();
    this.route.navigateByUrl("/home");
  }
  getUserName(userName:string){
    this.userName = userName;
  }
}
