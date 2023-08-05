import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { IUser } from '../Models/User';
import { AccountService } from '../Services/account.service';


@Directive({
  selector: '[appHadRole]'
})
export class HadRoleDirective implements OnInit{

  @Input() appHadRole:string[]=[];
  user:IUser={} as IUser;
  constructor(private viewContainerRef:ViewContainerRef,
    private templateRef:TemplateRef<any>,private accountService:AccountService)
    {
      this.accountService.currentUser$.subscribe({
        next:(user)=>{
          if(user) this.user=user;
        }
      });
    }

  ngOnInit(): void {
    if(this.user.roles.some(r=>this.appHadRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainerRef.clear();
    }
  }

}
