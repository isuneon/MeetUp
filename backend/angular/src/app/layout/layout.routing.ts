import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../_guards/auth.guard';

const LAYOUT_ROUTES: Routes = [ 
    { path: 'login', component: LoginComponent, },
    { path: 'login/:id_meetup', component: LoginComponent, },

    { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: '../pages/home/home.module#HomeModule' },
    { path: 'groups', loadChildren: '../pages/groups/groups.module#GroupsModule' },
     
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);