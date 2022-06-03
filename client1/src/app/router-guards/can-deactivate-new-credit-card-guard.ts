import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';
import { LoginHomeComponent } from "../components/security/login-home/login-home.component";

@Injectable()
export class CanDeactivateNewCreditCardGuard implements CanDeactivate<LoginHomeComponent>{
    canDeactivate(component: LoginHomeComponent): boolean {
        
        return true;
    }

}