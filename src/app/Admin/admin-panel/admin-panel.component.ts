import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  adminActive:boolean=false;
  moderatorActive:boolean=false;
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next:user=> {
        if(user?.roles.includes("Admin")){
          this.adminActive=true;
          this.moderatorActive=false;
        }
        if(user?.roles.includes("Moderator") && !user?.roles.includes("Admin")){
          this.adminActive=false;
          this.moderatorActive=true;
        }
      }
    })
  }

  photoManagement(){
    this.adminActive=false;
  }
}
