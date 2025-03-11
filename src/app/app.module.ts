import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';

import { KeycloakAngularModule } from 'keycloak-angular';
import { AuthGuard } from './shared/routes/auth.guard';
import { AuthService } from './shared/services/keycloak.service';

// Fonction pour initialiser Keycloak via AuthService

export function initializeKeycloak(kcService: AuthService): () => Promise<void> {
    return () => kcService.initKeycloak(); // ✅ Correct
  }
  

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzBreadCrumbModule,
    TemplateModule,
    SharedModule,
    NgChartjsModule,
    KeycloakAngularModule, // Module Keycloak
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    ThemeConstantService,
    AuthService, // Fournit AuthService pour Keycloak
    AuthGuard,   // Fournit AuthGuard
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [AuthService] // Injection correcte d'AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
