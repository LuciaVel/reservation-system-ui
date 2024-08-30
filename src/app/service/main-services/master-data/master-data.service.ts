import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpParamsUtilService } from '../../../utilities/http-params.util';

@Injectable({
  providedIn: 'root'
})

export class MasterDataService {
  private baseUrl = environment.apiBaseUrl;  // Use environment variable

  constructor(private http: HttpClient, private httpParamsUtil: HttpParamsUtilService) {}

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/master/roles`);
  }
}
