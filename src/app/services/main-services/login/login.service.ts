import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthenticationResponse } from '../../../interfaces/authentication/login.interface';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    private baseUrl = environment.apiBaseUrl;  // Use environment variable

    constructor(private http: HttpClient) {}

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/login`, credentials);
    }
}