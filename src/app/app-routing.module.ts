import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorsComponent } from './errors/errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'members',component:MemberListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'members/:userName',component:MemberDetailsComponent
  },
  {
    path:'lists',component:ListsComponent
  },
  {
    path:'messages',component:MessagesComponent
  },
  {
    path:'member/edit',component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuard]
  },
  {
    path:'error',component:ErrorsComponent
  },
  {
    path:'not-found',component:NotFoundComponent
  },
  {
    path:'server-error',component:ServerErrorComponent
  },
  {
    path:'**',redirectTo:'home',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
