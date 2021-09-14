import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AmlSearchService {
  private searchUrl=environment.search;
  constructor(private _http: HttpClient) { }
  private searchData:any
  private handleError(err:HttpErrorResponse){
  let errMsg: string='';
    console.log("An error occured:", err.error.message);
    console.log('Backend returned code',err.status);
    errMsg=err.error.message;

   return Observable.throw(err);
  }
  amlSearch(data:any,type:any){
    let indvidualEntity:any={
      "size":"10"
      ,"page":"0","searchType":"FUZZY","name":[],"country":[],"source":[],"guid":"","category":[],"gender":[],"type":[]
    }
    if(type==="individual"){
      if(data.fname!="")
     indvidualEntity.name.push(data.fname);
      if(data.country!="")
     indvidualEntity.country.push(data.country);
     indvidualEntity.type.push("Individual");
    }
    else if(type==="legal_entity"){
       if(data.cname!="")
       indvidualEntity.name.push(data.cname);
       if(data.country!="")
       indvidualEntity.country.push(data.country);
       indvidualEntity.type.push("Organisation");
    }
    this.searchData=indvidualEntity
     return this._http.post(this.searchUrl,this.searchData).pipe(

        catchError(this.handleError)
     )
  }
}
