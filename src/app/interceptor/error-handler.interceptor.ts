import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private _route:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error){
          switch(error.status){
            case 404:
              this._route.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras:NavigationExtras = {state:{error:error.error}}
              this._route.navigateByUrl("/server-error",navigationExtras);
              break;
            case 400:
              const badRequest:string|null = error.error;
              if(badRequest!=null) throw badRequest;
              break;
            case 401:
              const unAuthorized:string|null = error.error;
              if(unAuthorized!=null) throw unAuthorized;
              break;
            default:
              const unHandled:string|null="Something went wrong..";
              if(unHandled!=null) throw unHandled;
              break;
          }
        }
        throw error;
      })
    )
  }
}
