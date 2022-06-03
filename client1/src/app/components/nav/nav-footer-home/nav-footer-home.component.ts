import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer-home.component.html',
  styleUrls: ['./nav-footer-home.component.scss']
})
export class NavFooterHomeComponent implements OnInit {

  year: string;
  user: string;
  bname: string = 'RCCM';

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
    this.user = localStorage.getItem('user');
  }
}
