import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/Models/Member';
import { Pagination } from 'src/app/Models/Pagination';
import { IUser } from 'src/app/Models/User';
import { UserParams } from 'src/app/Models/userParams';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members:Member[]=[];
  pagination!:Pagination;

  totalPages:number[]=[];
  activePage:number=1;
  userParams!:UserParams;
  user!:IUser;
  genderList = [{value:'male',display:'Males'},{value:'female',display:'Females'}];

  constructor(private memberService:MembersService,private _accountService:AccountService) 
  { 
    this._accountService.currentUser$.pipe(take(1)).subscribe({
      next:user =>{
        if(user){
          this.userParams =new UserParams(user);
          this.user = user;
        }
      }
    })
  }
  spinner:boolean=true;

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.userParams).subscribe({
      next:(res)=>{
        if(res.result && res.pagination){
          this.members=res.result;
          this.pagination=res.pagination;
          this.totalPages.splice(0);
          this.pagesCount();
          this.spinner=false;
        }
      },
      error:(err)=>{
        this.spinner=false;
      }
    })
  }

  resetFilters(){
    if(this.user){
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }

  pageChanged(value:number){
    if(value<=this.totalPages.length && value>=1){
      this.activePage=value;
      this.userParams.pageNumber=value;
      this.loadMembers();
    }
  }

  pagesCount(){
    for(let i=1;i<=this.pagination.totalPages;i++){
      this.totalPages.push(i);
    }
  }
}
