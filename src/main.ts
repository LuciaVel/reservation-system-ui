import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { NG_SCROLLBAR_OPTIONS, NgScrollbarModule } from 'ngx-scrollbar';
import { Title, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";

if (environment.production) {
  enableProdMode();
}

export function tokenGetter() {
    return localStorage.getItem("jwt");
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            AppRoutingModule, 
            BrowserModule, 
            ReactiveFormsModule, 
            NgScrollbarModule, 
            FormsModule, 
            JwtModule.forRoot({
                config: {
                    tokenGetter: tokenGetter,
                    allowedDomains: [environment.domain],
                    disallowedRoutes: [],
                },
            }),
        ),
        Title, {
            provide: NG_SCROLLBAR_OPTIONS,
            useValue: {
                visibility: 'hover'
            }
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.log(err));
