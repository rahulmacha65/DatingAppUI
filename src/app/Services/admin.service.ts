import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;
  constructor(private _http:HttpClient) { }

  getUserWithRoles():Observable<IUser[]>{
    return this._http.get<IUser[]>(this.baseUrl+'admin/users-with-roles');
  }

  updateUserRoles(userName:string,roles:string){
    return this._http.post<string[]>(this.baseUrl+'admin/edit-roles/'+
    userName+'?roles='+roles,{});
  }
}
