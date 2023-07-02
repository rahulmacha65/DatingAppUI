import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../Models/Member';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
   baseUrl:string=environment.apiUrl;
  constructor(private _http:HttpClient) { }

  getMembers():Observable<Member[]>{
    return this._http.get<Member[]>(this.baseUrl+'Users')
  }

  getMember(userName:string):Observable<Member>{
    return this._http.get<Member>(this.baseUrl+'Users/'+userName)
  }

}
