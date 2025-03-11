import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  async initKeycloak(): Promise<void> {
    console.log('Initialisation de Keycloak...');
    try {
      await this.keycloak.init({
        config: {
          url: 'http://localhost:8080/admin', // URL de Keycloak
          realm: 'myrealm', // Realm
          clientId: 'spring-boot-backend', // Client ID
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + 'src/assets/silent-check-sso.html',
        },
      });
      console.log('Keycloak initialisé avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Keycloak :', error);
    }
  }

  
  loginAndRedirect(url: string): void {
    console.log('Redirection vers Keycloak...');
    this.keycloak.login({ redirectUri: url });
  }
  logout(): void {
    this.keycloak.logout();
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }
}
