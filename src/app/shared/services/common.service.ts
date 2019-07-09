import { Injectable } from '@angular/core';
// import * as _ from "lodash";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CommonService {
  private jsonObject:any;
  constructor(private http: HttpClient) {
    this.setJsonObject();
  }

  public setJsonObject() {
    this.getAutoCompleteObject().subscribe((r) => {
        this.jsonObject = r['parsorObject'];
    })
  }

  getObject():any {
    return this.jsonObject;
  }

  private getAutoCompleteObject(): Observable<HttpResponse<any>> {
    return this.http.get<any>("/assets/macwoac/data/data.json?" + new Date().getTime());
  }

}
