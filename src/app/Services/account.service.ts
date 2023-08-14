import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  IUser } from '../Models/User';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceService } from '../Service/presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource=new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _http:HttpClient,private _presenceService:PresenceService) { }

  userLogin(user:any):Observable<IUser>{
    return this._http.post<IUser>(environment.apiUrl+'Login',user).pipe(
      map((res:IUser)=>{
        const user = res;
        if(user){
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  userRegister(user:any):Observable<IUser>{
    return this._http.post<IUser>(environment.apiUrl+'register',user).pipe(
      map(user=>{
        if(user){
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user:IUser){
    user.roles=[];
    const roles =this.getDecodedToken(user.token).role;
    Array.isArray(roles)?user.roles = roles:user.roles.push(roles);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
    this._presenceService.createHubConnection(user);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this._presenceService.stopHubConnection();
  }

  getDecodedToken(token:string){
    return JSON.parse(atob(token.split('.')[1]));
  }
}
