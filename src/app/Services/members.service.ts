import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../Models/Member';
import { Observable, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../Models/Pagination';
import { UserParams } from '../Models/userParams';
import { AccountService } from './account.service';
import { IUser } from '../Models/User';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl:string=environment.apiUrl;
  members:Member[]=[];
  genderArray:string[]=[];
  memberCache = new Map();
  user!:IUser;
  userParams!:UserParams;

  constructor(private _http:HttpClient,private _accountService:AccountService) 
  { 
    this._accountService.currentUser$.subscribe({
      next:user =>{
        if(user){
          this.userParams =new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  getUserParams(){
    return this.userParams;
  }
  setUserParams(params:UserParams){
    this.userParams=params;
  }

  resetUserParams(){
    if(this.user){
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return undefined;
  }
  getMembers(userParams:UserParams):Observable<PaginatedResult<Member[]>>{
    
    let response = this.memberCache.get(Object.values(userParams).join('-'));
    this.genderArray.push(userParams.gender);
    
    if(response ==undefined && this.userParams.pageNumber>1 && this.userParams.gender!=this.genderArray[this.genderArray.length-2]){
      this.userParams.pageNumber = this.userParams.pageNumber-1;
      response = this.memberCache.get(Object.values(userParams).join('-'));
    }

    if(response) return of(response);

    let  params = getPaginationHeaders(userParams);
    
    return getPaginatedResult<Member[]>(this.baseUrl+'Users',params,this._http).pipe(
      map(response =>{
        this.memberCache.set(Object.values(userParams).join('-'),response);
        
        return response;
      })
    )
  }

  getMember(userName:string):Observable<Member>{
    const member = [...this.memberCache.values()]
      .reduce((preArrar,currArry)=> preArrar.concat(currArry),[])
      .find((member:Member)=>member.userName == userName);

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

  addLike(userName:string){
    return this._http.post(this.baseUrl+'likes/'+userName,{});
  }

  getLike(predicate:string,pageNumber:number,pageSize:number):Observable<PaginatedResult<Member[]>>{
    this.userParams.pageNumber = pageNumber;
    this.userParams.pageSize = pageSize;
    let params = getPaginationHeaders(this.userParams);
    params = params.append('Perdicate',predicate);
    return getPaginatedResult<Member[]>(this.baseUrl+'likes',params,this._http);
  }
}
