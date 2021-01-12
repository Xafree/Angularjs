import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LdapEditComponent} from './ldap-edit/ldap-edit.component';
import {LdapAddComponent} from './ldap-add/ldap-add.component';
import {LdapListComponent} from './ldap-list/ldap-list.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'users/add', component: LdapAddComponent},
  { path: 'user/:id', component: LdapEditComponent},
  { path: '', redirectTo: 'users/list', pathMatch: 'full' }, ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LdapManagementRoutingModule { }
