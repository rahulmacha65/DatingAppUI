import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../Models/Member';
import { IUser } from '../Models/User';
import { AccountService } from '../Services/account.service';
import { MembersService } from '../Services/members.service';
import { take } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member!:Member;
  user:IUser|null=null;
  updatedStatus:string|null=null;
  spinner:boolean=true;

  @ViewChild('Editform') memberForm!:NgForm;

  @HostListener('window:beforeunload',['$event']) Notification($event:any){
    if(this.memberForm.dirty){
      $event.returnValue=true;
    }
  }

  constructor(private accountService:AccountService,private memberService:MembersService) 
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:(user)=>this.user=user
    })
  }

  ngOnInit(): void {
    this.updatedStatus=null
    this.loadMember();
  }

  loadMember(){
    if(!this.user) return;
    this.memberService.getMember(this.user.userName.toLowerCase()).subscribe({
      next:(res)=>{
        this.spinner=false;
        this.member=res
      },
      error:(err)=>{
        this.spinner=false;
      }
      
    })
  }

  updateMember(){
    this.memberForm.reset(this.member);
    this.memberService.updateMember(this.member).subscribe({
      next:_=>{
        this.updatedStatus= "Profile updated successfully.";
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
        this.spinner=false;
      },
      error:(err)=>{
        this.updatedStatus = err;
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
        this.spinner=false;
      }
    })
  }
}
