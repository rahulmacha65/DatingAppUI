import { Component, OnInit } from '@angular/core';
import { AccountService } from './Services/account.service';
import { IUser } from './Models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private _accountService:AccountService){}

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
