import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel:any={}

  registrationStatus:string | null=null;

  constructor(private _accountService:AccountService,private route:Router) { }

  ngOnInit(): void {
  }

  register(){
    this._accountService.userRegister(this.registerModel).subscribe({
      next:(res)=>{
        console.log(res);
        this.registrationStatus=null;
        this.route.navigateByUrl("/home");
      },
      error:(err)=>{
        console.log(err);
        this.registrationStatus=err.error;
      },
      complete:()=>{
        this.registrationStatus=null;
        console.log("Registration Completed.");
      }
    })
  }

  
}
