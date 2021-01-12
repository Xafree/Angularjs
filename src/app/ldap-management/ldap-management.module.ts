import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LdapManagementRoutingModule } from './ldap-management-routing.module';
import {NavbarComponent} from './navbar/navbar.component';
import {LdapListComponent} from './ldap-list/ldap-list.component';
import {LdapAddComponent} from './ldap-add/ldap-add.component';
import {LdapEditComponent} from './ldap-edit/ldap-edit.component';
import {AlertComponent} from '../share/alert/alert.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../appmaterial.module';
import {LdapComponent} from './ldap/ldap.component';
import {ChartsModule} from 'ng2-charts';



@NgModule({
  declarations: [
    NavbarComponent,
    LdapComponent,
    LdapListComponent,
    LdapAddComponent,
    LdapEditComponent,
    AlertComponent, ],
    exports: [
        LdapComponent,
        NavbarComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AppMaterialModule,
    LdapManagementRoutingModule
  ]
})
export class LdapManagementModule { }
