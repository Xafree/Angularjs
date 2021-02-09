import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LdapEditComponent} from './ldap-edit/ldap-edit.component';
import {LdapAddComponent} from './ldap-add/ldap-add.component';
import {LdapListComponent} from './ldap-list/ldap-list.component';
import {LdapComponent} from './ldap/ldap.component';
import {AuthGuard} from '../security/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'user',
    component: LdapComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          // { path: 'dashboard', component: DashboardComponent },
          { path: 'list', component: LdapListComponent },
          { path: 'add', component: LdapAddComponent },
          { path: ':id', component: LdapEditComponent },
          { path: '', redirectTo: '/user/list', pathMatch: 'full' },
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class LdapManagementRoutingModule { }
