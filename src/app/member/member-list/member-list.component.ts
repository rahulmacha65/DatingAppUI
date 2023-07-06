import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Models/Member';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members:Member[]=[];
  constructor(private memberService:MembersService) { }
  spinner:boolean=true;
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next:(res)=>{
        this.members=res;
        this.spinner=false;
      },
      error:(err)=>{
        this.spinner=false;
      }
    })
  }
}
