import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users/users.component';
import {AppComponent} from './app.component';
const appRoutes: Routes = [{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
{path: 'users', component: UsersComponent},
{path: 'dashboard', component: AppComponent, outlet: 'dashboard'},
{path: '**', redirectTo: 'dashboard'}
];
@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule {
//http://onehungrymind.com/named-router-outlets-in-angular-2/
}
