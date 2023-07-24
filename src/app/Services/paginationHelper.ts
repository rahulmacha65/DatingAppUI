import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs";
import { PaginatedResult } from "../Models/Pagination";
import { UserParams } from "../Models/userParams";

export function getPaginatedResult<T>(url:string,params:HttpParams,_http:HttpClient){
    const paginationResults:PaginatedResult<T>=new PaginatedResult<T>;
    return _http.get<T>(url,{observe:'response',params}).pipe(
      map(response =>{
        if(response.body){
          paginationResults.result = response.body;
          
        }
        const pagination = response.headers.get('Pagination');
        if(pagination){
          paginationResults.pagination = JSON.parse(pagination);
        }
        return paginationResults;
      })
    )
  }

export function getPaginationHeaders(userParams:UserParams){
    let params = new HttpParams();
    params = params.append('pageNumber',userParams.pageNumber);
    params = params.append('pageSize',userParams.pageSize);
    params = params.append('minAge',userParams.minAge);
    params = params.append('maxAge',userParams.maxAge);
    params = params.append('gender',userParams.gender);
    params = params.append('orderBy',userParams.orderBy);
    return params;
  }