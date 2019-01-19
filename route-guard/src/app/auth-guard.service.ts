import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService,
              public router: Router) {
  }

  canActivate() {
    console.log('canActivate');
    const auth = this.auth.isAuthenticated();
    console.log('Auth? ', auth);
    return auth;
  }

}
