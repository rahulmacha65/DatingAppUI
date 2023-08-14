import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/Models/Message';
import { MessagesService } from 'src/app/Services/messages.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userName?:string;
  @ViewChild('messageThread') messageForm?:NgForm
  // messages:Message[]=[];
  messageContent:string='';
  
  constructor(public _messageService:MessagesService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    if(this.userName){
      this._messageService.getMessageThread(this.userName).subscribe({
        next:messages=>{
          // this.messages=messages;
          // console.log(this.messages);
        }
      })
    }
  }

  sendMessage(){
    if(!this.userName) return;
    this._messageService.sendMessage(this.userName,this.messageContent).then(()=>{
      this.messageForm?.reset();
    })
    // this._messageService.sendMessage(this.userName,this.messageContent).subscribe({
    //   next:message=>{
    //     // this.messages.push(message);
    //     this.messageForm?.reset();
    //   }
    // })
  }
}
