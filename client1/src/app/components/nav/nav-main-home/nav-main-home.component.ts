import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataService } from 'src/app/Helpers/dataData';


@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main-home.component.html',
  styleUrls: ['./nav-main-home.component.scss']
})
export class NavMainHomeComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  brand: string = "BETS Online Store"
  displayBadge: boolean = false; 
  items: MenuItem[];
  val: number;

  ngOnInit(): void
  {
    this.dataService.onDataChange((value) =>{
      this.val = value;
      this.displayBadge = this.val > 0;
    });

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
