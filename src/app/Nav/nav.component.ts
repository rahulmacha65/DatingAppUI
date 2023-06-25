import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Observable,of } from 'rxjs';
import { IUser } from '../Models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  userName:string="";

  constructor(public _loginService:AccountService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user){
      this.userName = JSON.parse(user).userName;
    }
  }

  
  logout(){
    this._loginService.userLogout();
  }
}
