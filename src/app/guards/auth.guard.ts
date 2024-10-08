import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private router:Router, private jwtHelper: JwtHelperService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    
    this.router.navigate(["login"]);
    return false;
  }
}
