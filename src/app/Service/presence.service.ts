import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  hubUrl:string = environment.hubUrl;
  private hubConnection?:HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor() { }

  createHubConnection(user:IUser){
    this.hubConnection = new HubConnectionBuilder().
    withUrl(this.hubUrl+'presence',{
      accessTokenFactory:()=>user.token
    })
    .withAutomaticReconnect()
    .build();

    this.hubConnection.start().catch(error =>console.log(error));

    this.hubConnection.on("UserIsOnline",userName=>{
      console.log(userName+" Online");
    });

    this.hubConnection.on("UserIsOffline",userName=>{
      console.log(userName+" Offline");
    })

    this.hubConnection.on("GetOnlineUsers",userName=>{
      this.onlineUsersSource.next(userName);
    });
    
    this.hubConnection.on("NewMessageReceived",data=>{
      console.log(data+' has sent you a new message!');
    })
  }

  stopHubConnection(){
    this.hubConnection?.stop().catch(error=>console.log(error));
  }
}
