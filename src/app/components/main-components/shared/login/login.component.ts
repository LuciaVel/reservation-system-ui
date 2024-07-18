import { Component, NgModule, OnInit } from '@angular/core';
import { PanelComponent } from '../../../panel/panel.component';
import { LoginModel } from '../../../../interfaces/authentication/login.interface';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/main-services/login/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
    standalone: true,
    selector: 'login',
    templateUrl: './login.component.html',
    imports: [
      PanelComponent,
      FormsModule,
      NgIf
    ]
})

export class LoginComponent implements OnInit{
    invalidLogin: boolean;
    credentials: LoginModel = {username:'', password:''};
    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit(): void {
        
    }

    login = ( form: NgForm) => {
        if (form.valid) {
            this.loginService.login(this.credentials).subscribe({
                next: (response: any) => {
                    const token = response.token;
                    localStorage.setItem("jwt", token); 
                    this.invalidLogin = false; 
                    this.router.navigate(["/admin-user-management"]);
                },
                error: (err: HttpErrorResponse) => this.invalidLogin = true
            })
        }
    }
}