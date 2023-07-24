import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { UserParams } from '../Models/userParams';
import { Message } from '../Models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseUrl:string=environment.apiUrl;
  userParams!:UserParams;
  constructor(private _http:HttpClient) { }

  getMessages(pageNumber:number,pageSize:number,container:string){
    this.userParams.pageNumber = pageNumber;
    this.userParams.pageSize = pageSize;
    let params =getPaginationHeaders(this.userParams);
    params = params.append("Container",container);
    return getPaginatedResult<Message[]>(this.baseUrl+'messages',params,this._http);
  }
  setUserParams(params:UserParams){
    this.userParams=params;
  }

  getMessageThread(userName:string){
    return this._http.get<Message[]>(this.baseUrl+'messages/thread/'+userName);
  }

  sendMessage(userName:string,content:string){
    return this._http.post<Message>(this.baseUrl+'messages',{recipientUserName:userName,content:content});
  }

  deleteMessage(id:number){
    return this._http.delete(this.baseUrl+'messages/'+id);
  }
}
