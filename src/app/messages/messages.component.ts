import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/Message';
import { Pagination } from '../Models/Pagination';
import { MessagesService } from '../Services/messages.service';
import { UserParams } from '../Models/userParams';
import { MembersService } from '../Services/members.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages!:Message[];
  pagination!:Pagination;
  container='Unread';
  pageNumber=1;
  pageSize=5;
  totalPages:number[]=[];
  activePage:number=1;
  userParams!:UserParams;
  constructor(private _messageService:MessagesService,private memberService:MembersService)
  {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMessages(this.container);
  }

  loadMessages(container:string){
    this.container=container;
    if(this.userParams){
      this._messageService.setUserParams(this.userParams);
    }
    this._messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe({
      next:response =>{
        if(response.result && response.pagination){
          this.messages=response.result;
          this.pagination =response.pagination;
          console.log(this.messages);
          this.totalPages.splice(0);
          this.pagesCount();
        }
        
      }
    })
  }

  pageChanged(value:number){
    if(value<=this.totalPages.length && value>=1){
      this.activePage=value;
      this.userParams.pageNumber=value;
      this.loadMessages(this.container);
    }
  }

  pagesCount(){
    for(let i=1;i<=this.pagination.totalPages;i++){
      this.totalPages.push(i);
    }
  }

  deleteMessage(id:number){
    this._messageService.deleteMessage(id).subscribe({
      next:_=>this.messages.splice(this.messages.findIndex(m=>m.id))
    })
  }
}
