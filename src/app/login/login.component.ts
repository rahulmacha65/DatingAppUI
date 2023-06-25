import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { IUser } from '../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel:any={};
  loginStatus:string|null=null;
  constructor(public _accountService:AccountService){}

  ngOnInit(): void {
    
  }



  login(){
    this._accountService.userLogin(this.loginModel).subscribe({
      next:(res)=>{
        console.log(res);
        this.loginStatus=null;
      },
      error:(err)=>{
        console.log(err);
        this.loginStatus = err.error;
      },
      complete:()=>{
        console.log("Login Successfully Completed.");
      }
    })
  }
}
