import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { FullLayout_ROUTES } from "./shared/routes/full-layout.routes";
import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";
import { AuthGuard } from './shared/routes/auth.guard';
import { componentMaster } from './dashboard/default/componentMaster';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full',
    },
    { path: 'mastere', component: componentMaster, canActivate: [AuthGuard] },


    { 
        path: '', 
        component: CommonLayoutComponent,
        children: CommonLayout_ROUTES 
    },
    { 
        path: '', 
        component: FullLayoutComponent, 
        children: FullLayout_ROUTES
    }
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { 
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled' 
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}