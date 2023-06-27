import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _accountService:AccountService,private route:Router){}
  canActivate(): Observable<boolean> {
    return this._accountService.currentUser$.pipe(
      map(user=>{
        if(user){
          return true;
        }
        else{
          this.route.navigateByUrl("/login");
          this._accountService.userLogout();
          return false;
        }
      })
    );
  }
}
