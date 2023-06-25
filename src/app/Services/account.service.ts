import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  IUser } from '../Models/User';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl:string = "https://localhost:5000/api/";

  private currentUserSource=new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _http:HttpClient) { }

  userLogin(user:any):Observable<IUser>{
    return this._http.post<IUser>(this.baseUrl+'Login',user).pipe(
      map((res:IUser)=>{
        const user = res;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  userRegister(user:any):Observable<IUser>{
    return this._http.post<IUser>(this.baseUrl+'register',user).pipe(
      map(user=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user:IUser){
    this.currentUserSource.next(user);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
