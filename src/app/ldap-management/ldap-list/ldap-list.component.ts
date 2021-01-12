import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
//import {LDAP_USERS} from '../model/ldap-mock-dat';
import {UserLdap} from '../../model/user-ldaps';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {UsersService} from '../../service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ldap',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  //dataSource = new MatTableDataSource<UserLdap>([]); ancien code
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  unactiveSelected = false;
  constructor(private usersService: UsersService, private router: Router) { }

  /** ancien code
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
  }
*/
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe(
      users => this.dataSource.data = users
    );
    if (this.unactiveSelected) {
      this.dataSource.data = this.dataSource.data.filter( user =>
        user.active === false
      );

    }
  }
  filterPredicate(data, filter) {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser(): void {
    this.router.navigate(['/users/add']).then((e) => {
      if (!e) {
        console.log('Navigation has failed!');
      }
    });
  }

  unactiveChanged($event: MatSlideToggleChange) {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string): void {
    this.router.navigate(['/user', login]).then((e) => {
      if (!e) {
        console.log("Navigation has failed!");
      }
    });
  }
}
