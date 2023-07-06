import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../Models/Member';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl:string=environment.apiUrl;
  members:Member[]=[];
  constructor(private _http:HttpClient) { }

  getMembers():Observable<Member[]>{
    if(this.members.length>0) return of(this.members)
    return this._http.get<Member[]>(this.baseUrl+'Users').pipe(
      map(member=>{
        this.members=member
        return this.members;
      })
    )
  }

  getMember(userName:string):Observable<Member>{
    const member = this.members.find(x =>x.userName==userName);
    if(member) return of(member);
    return this._http.get<Member>(this.baseUrl+'Users/'+userName)
  }

  updateMember(member:Member){
    return this._http.put(this.baseUrl+'Users',member);
  }
}
