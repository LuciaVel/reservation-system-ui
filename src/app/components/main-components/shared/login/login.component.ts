import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { PanelComponent } from '../../../panel/panel.component';
import { LoginModel } from '../../../../interfaces/authentication/login.interface';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/main-services/login/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AppSettings } from '../../../../service/app-settings.service';

@Component({
    standalone: true,
    selector: 'login',
    templateUrl: './login.component.html',
    imports: [
      //PanelComponent,
      FormsModule,
      NgIf
    ]
})

export class LoginComponent implements OnDestroy{
    invalidLogin: boolean;
    credentials: LoginModel = {username:'', password:''};
    constructor(private router: Router, private loginService: LoginService, public appSettings: AppSettings) { 
        this.appSettings.appEmpty = true;
    }

    ngOnDestroy(): void {
        this.appSettings.appEmpty = false;
    }

    login = (form: NgForm) => {
        //console.log(this.credentials);
        if (form.valid) {
            this.loginService.login(this.credentials).subscribe({
                next: (response: any) => {
                    const token = response.token;
                    localStorage.setItem("jwt", token); 
                    this.invalidLogin = false; 
                    this.router.navigate(["/admin-user-management"]);
                    // const decodedToken = this.jwtHelper.decodeToken(token);
                    // const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                    
                    // if (role.includes('Admin')) {
                    //     console.log("This is Admin");
                    //     this.router.navigate(['/admin-user-management']);
                    // } else if (role.includes('user')) {
                    //     this.router.navigate(['user-dashboard']);
                    // }
                },
                error: (err: HttpErrorResponse) => this.invalidLogin = true
            })
        }
    }
}