import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { IUser } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel:any={};
  loginStatus:string|null=null;
  constructor(public _accountService:AccountService,private route:Router){}

  ngOnInit(): void {
    
  }



  login(){
    this._accountService.userLogin(this.loginModel).subscribe({
      next:(res)=>{
        this.loginStatus=null;
        this.route.navigateByUrl("/members");
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
