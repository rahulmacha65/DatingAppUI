import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../Models/Member';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../Models/Pagination';
import { UserParams } from '../Models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl:string=environment.apiUrl;
  members:Member[]=[];

  constructor(private _http:HttpClient) { }


  getMembers(userParams:UserParams):Observable<PaginatedResult<Member[]>>{

    let  params = this.getPaginationHedears(userParams);

    return this.getPaginatedResult(this.baseUrl+'Users',params);
  }

  getMember(userName:string):Observable<Member>{
    const member = this.members.find(x =>x.userName==userName);
    if(member) return of(member);
    return this._http.get<Member>(this.baseUrl+'Users/'+userName)
  }

  updateMember(member:Member){
    return this._http.put(this.baseUrl+'Users',member);
  }

  setMainPhoto(photoId:number){
    return this._http.put(this.baseUrl+'Users/set-main-photo/'+photoId,{});
  }

  deletePhoto(photoId:number){
    return this._http.delete(this.baseUrl+'Users/delete-photo/'+photoId);
  }

  private getPaginatedResult<T>(url:string,params:HttpParams){
    const paginationResults:PaginatedResult<T>=new PaginatedResult<T>;
    return this._http.get<T>(url,{observe:'response',params}).pipe(
      map(response =>{
        if(response.body){
          paginationResults.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if(pagination){
          paginationResults.pagination = JSON.parse(pagination);
        }
        return paginationResults;
      })
    )
  }

  private getPaginationHedears(userParams:UserParams){
    let params = new HttpParams();
    params = params.append('pageNumber',userParams.pageNumber);
    params = params.append('pageSize',userParams.pageSize);
    params = params.append('minAge',userParams.minAge);
    params = params.append('maxAge',userParams.maxAge);
    params = params.append('gender',userParams.gender);
    return params;
  }
}
