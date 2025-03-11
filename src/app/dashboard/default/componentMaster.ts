import { Component } from '@angular/core'
import { AuthService } from 'src/app/shared/services/keycloak.service';


@Component({
    templateUrl: './default-dashboard.component.html'
})

export class  componentMaster{
    constructor(private authService: AuthService) {}

    async accessMastere() {
        console.log('Clic sur le bouton Accéder'); // Log pour vérifier que la méthode est appelée
        const isLoggedIn = await this.authService.isLoggedIn();
        console.log('Utilisateur authentifié :', isLoggedIn); // Log pour vérifier l'état de connexion
        if (isLoggedIn) {
          // L'utilisateur est déjà authentifié, on le redirige directement
          console.log('Redirection vers http://mastere.utm.rnu.tn/'); // Log pour vérifier la redirection
          window.location.href = 'http://mastere.utm.rnu.tn/';
        } else {
          // L'utilisateur n'est pas connecté, on le redirige vers Keycloak
          console.log('Redirection vers Keycloak...'); // Log pour vérifier la redirection vers Keycloak
          this.authService.loginAndRedirect('http://mastere.utm.rnu.tn/');
        }
      }
}


