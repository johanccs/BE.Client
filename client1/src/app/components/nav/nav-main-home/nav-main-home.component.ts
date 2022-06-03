import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main-home.component.html',
  styleUrls: ['./nav-main-home.component.scss']
})
export class NavMainHomeComponent implements OnInit {

  constructor(private router: Router) { }

  brand: string = "BETS Online Store"
  displayBadge: boolean = false; 
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {label: 'Update', icon: 'pi pi-refresh', command: () => {
          
      }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          
      }},
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator:true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
