import { Component, OnInit } from '@angular/core';
import { IUser } from './Models/User';
import { AccountService } from './Services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(public _accountService:AccountService){}
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString=localStorage.getItem('user');
    if(!userString) return;

    const user:IUser = JSON.parse(userString);
    this._accountService.setCurrentUser(user);
  }
}
