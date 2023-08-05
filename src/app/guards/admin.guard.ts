import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService:AccountService){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean> {

    return this.accountService.currentUser$.pipe(
      map((user)=>{
        if(!user) return false;
        if(user.roles.includes("Admin") || user.roles.includes("Moderator")){
          return true;
        }else{
          return false;
        }
      })
    )
  }
  
}
