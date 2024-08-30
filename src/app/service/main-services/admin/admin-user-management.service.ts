import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpParamsUtilService } from '../../../utilities/http-params.util';

@Injectable({
  providedIn: 'root'
})

export class AdminUserManagementService {
  private baseUrl = environment.apiBaseUrl;  // Use environment variable

  constructor(private http: HttpClient, private httpParamsUtil: HttpParamsUtilService) {}

  getUserList(filter: any): Observable<any> {
    const params = this.httpParamsUtil.generateHttpParams(filter);
    return this.http.get<any>(`${this.baseUrl}/admin/users`, {
      params: params
    });
  }

  getUserDetailById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/users/${id}`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/add-user`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/users/${id}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/users/${id}`, userData);
  }
}
