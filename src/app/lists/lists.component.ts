import { Component, OnInit } from '@angular/core';
import { Member } from '../Models/Member';
import { MembersService } from '../Services/members.service';
import { Pagination } from '../Models/Pagination';
import { UserParams } from '../Models/userParams';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members:Member[]=[];
  predicate:string="liked";
  pageNumber=1;
  pageSize=10;
  pagination!:Pagination;
  totalPages:number[]=[];
  activePage:number=1;
  userParams!:UserParams;

  constructor(private _memberService:MembersService) {}

  ngOnInit(): void {
    this.loadLikes(this.predicate);
  }

  loadLikes(predicate:string){
    this.predicate  = predicate;
    this._memberService.getLike(this.predicate,this.pageNumber,this.pageSize).subscribe({
      next:res =>{
        if(res.result && res.pagination){
          this.members = res.result;
          this.pagination = res.pagination;
          this.totalPages.splice(0);
          this.pagesCount();
        }
      }
    })
  }

  pageChanged(value:number){
    if(value<=this.totalPages.length && value>=1){
      console.log(value);
      this.activePage=value;
      this.pageNumber=value;
      console.log(this.userParams);
      this.loadLikes(this.predicate);
    }
  }

  pagesCount(){
    for(let i=1;i<=this.pagination.totalPages;i++){
      this.totalPages.push(i);
    }
  }
} 
