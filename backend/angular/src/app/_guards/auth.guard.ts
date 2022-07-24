import { Injectable } from '@angular/core';
import { Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

declare var $:any;

@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild{
  activo;
    constructor(private router: Router,) { }

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem('id_meetup')!= null){
          this.activo = true;
        }else{
          this.activo = false;
        }
        
        if(this.activo){
          return true;
        }else{
          this.router.navigate(['/login']);
          return false;
        }

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
