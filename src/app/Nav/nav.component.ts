import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Observable,of } from 'rxjs';
import { IUser } from '../Models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loginModel:any={};

  constructor(public _loginService:AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this._loginService.userLogin(this.loginModel).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("Login Successfully Completed.");
      }
    })
  }

  logout(){
    this._loginService.userLogout();
  }
}
