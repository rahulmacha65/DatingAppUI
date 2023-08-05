import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/Models/User';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users:IUser[]=[];
  availableRoles:string[]=["Admin","Moderator","Member"];
  selectedUser!:IUser;
  
  userName!:string;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getUserWithRoles();
    
  }

  getUserWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next:users => this.users=users
    })
  }

  editUserRole(user:IUser){
    this.selectedUser=user;

    this.userName=this.selectedUser.userName;
  }

  checkBoxcheckedorUnchecked(event:any){
    if(event.target.checked && this.selectedUser.roles.indexOf(event.target.value)==-1){
      this.selectedUser.roles.push(event.target.value);
    }else{
      const index = this.selectedUser.roles.indexOf(event.target.value);
      this.selectedUser.roles.splice(index,1);
    }
  }
  updateUserRoles(){

    if(this.selectedUser.roles.length>0){
      const roles:string = this.selectedUser.roles.join(',');
      this.adminService.updateUserRoles(this.userName,roles).subscribe({
        next:roles=> this.selectedUser.roles=roles
      })
    }
    
  }
}
