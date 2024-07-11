import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpParamsUtilService {
  constructor() { }

  generateHttpParams(paramsObj: any): HttpParams {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key) && paramsObj[key] != null) {
        params = params.set(key, paramsObj[key].toString());
      }
    }
    return params;
  }
}
