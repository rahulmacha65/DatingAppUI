import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { UserParams } from '../Models/userParams';
import { Message } from '../Models/Message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IUser } from '../Models/User';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseUrl:string=environment.apiUrl;
  userParams!:UserParams;
  hubUrl:string=environment.hubUrl;

  private hubConnection?:HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private _http:HttpClient) { }

  createHubConnection(user:IUser,otherUsername:string){
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl+'message?user='+otherUsername,{
      accessTokenFactory:()=>user.token
    })
    .withAutomaticReconnect()
    .build();
    this.hubConnection?.start().catch(error => console.log(error));

    this.hubConnection.on("ReceiveMessageThread",messages=>{
      this.messageThreadSource.next(messages);
    });

    this.hubConnection.on("NewMessage",message=>{
      this.messageThread$.pipe(take(1)).subscribe({
        next:messages=>{
          this.messageThreadSource.next([...messages,message]);
        }
      })
    })

  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection?.stop();
    }
  }

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

  async sendMessage(userName:string,content:string){
    const createMessageDto={
      RecipientUserName:userName,
      Content:content
    }
    console.log(createMessageDto);
    return this.hubConnection?.invoke("SendMessage",createMessageDto)
    .catch(error => console.log(error));
    //return this._http.post<Message>(this.baseUrl+'messages',{recipientUserName:userName,content:content});
  }

  deleteMessage(id:number){
    return this._http.delete(this.baseUrl+'messages/'+id);
  }
}
