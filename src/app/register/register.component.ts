import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import {  Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel:any={};
  customValidation:boolean=false;
  registrationStatus:string | null=null;
  ageLimit:boolean=false;

  constructor(private _accountService:AccountService,private route:Router) { }

  ngOnInit(): void {
    
  }
  passwordChange(){
    if(this.registerModel.confirmPassword == undefined) return
    
    if(this.registerModel.confirmPassword.length>0){
      this.matchPassword(this.registerModel.confirmPassword,this.registerModel.password)
    }
  }
  matchPassword(confirmPassword:string,password:string){
    if(password !== confirmPassword){
      this.customValidation=true;
    }else{
      this.customValidation=false;
    }
  }

  maxAge(value:Date){
    const date = new Date().getFullYear();
    const userDate = new Date(value).getFullYear();
    if(date - userDate < 17 ){
      this.ageLimit=true;
    }
    else{
      this.ageLimit=false;
    }
  }
  register(){
    this._accountService.userRegister(this.registerModel).subscribe({
      next:(res)=>{
        console.log(res);
        this.registrationStatus=null;
        this.route.navigateByUrl("/members");
      },
      error:(err)=>{
        console.log(err);
        this.registrationStatus=err.error;
      }
    })
  }

  
}
