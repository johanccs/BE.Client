import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  
  constructor(private router: Router, private jwtHelper: JwtHelperService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      const token = localStorage.getItem("token");
      
      if(!token && this.jwtHelper.isTokenExpired(token)){
    
        alert("You are not logged in");
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return false;
      }

      return true;
  }
  
}
