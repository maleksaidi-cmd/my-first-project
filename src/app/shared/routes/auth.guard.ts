import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.keycloak.isLoggedIn();
    if (!isAuthenticated) {
      this.keycloak.login();
      return false;
    }
    return true;
  }
}
