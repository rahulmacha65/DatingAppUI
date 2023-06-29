import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NavComponent } from './Nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ErrorsComponent } from './errors/errors.component';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent,
    ErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlerInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
