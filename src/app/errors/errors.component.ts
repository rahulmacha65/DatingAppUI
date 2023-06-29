import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  baseUrl:string="https://localhost:5000/api/";
  validationError!:string;
  constructor(private _http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this._http.get(this.baseUrl+"Buggy/not-found").subscribe({
      next:response =>console.log(response),
      error:error=>console.log(error)
    })
  }

  get400Error(){
    this._http.get(this.baseUrl+"Buggy/bad-request").subscribe({
      next:response =>console.log(response),
      error:error=>{
        console.log(error);
        this.validationError = error;
      }
    })
  }
  get500Error(){
    this._http.get(this.baseUrl+"Buggy/server-error").subscribe({
      next:response =>console.log(response),
      error:error=>console.log(error)
    })
  }
  get401Error(){
    this._http.get(this.baseUrl+"Buggy/auth").subscribe({
      next:response =>console.log(response),
      error:error=>console.log(error)
    })
  }
}
