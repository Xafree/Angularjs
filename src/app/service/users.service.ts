import { Injectable } from '@angular/core';
import {LDAP_USERS} from '../model/ldap-mock-dat';
import {UserLdap} from '../model/user-ldaps';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  static users: UserLdap[] = LDAP_USERS;

  constructor() { }

  getUsers(): Observable<UserLdap[]> {
    return of(UsersService.users);
  }

  getUser(login: string): Observable<UserLdap> {
    return of (UsersService.users.find(user => user.login === login));
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    // Ajout dans la liste
    UsersService.users.push(user);
    return of(user);
  }
  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    // Modification de l'utilisateur
    const user = UsersService.users.find( u => u.login === userToUpdate.login);
    if (user) {
      // Modif
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = user.nom + ' ' + user.prenom;
      user.motDePasse = userToUpdate.motDePasse;
      return of(userToUpdate);
    }
    return throwError('Utilisateur non trouvé');
  }

}
