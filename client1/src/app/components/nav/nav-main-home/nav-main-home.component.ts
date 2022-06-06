import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Helpers/dataService';
import { InternalCartService } from 'src/app/Helpers/internalCartService';


@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main-home.component.html',
  styleUrls: ['./nav-main-home.component.scss']
})
export class NavMainHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
    private internCart: InternalCartService) { }

  brand: string = "BETS Online Store"
  displayBadge: boolean = false; 
  val: number;
  cartItems: any[] = [];

  ngOnInit(): void
  {
    this.dataService.onDataChange((value) =>
    {
      this.val = value;
      this.displayBadge = this.val > 0;
    });

    this.internCart.onDataChange((value) => {
      this.cartItems.push(value);
    });

  }

  gotoCart(){
    this.router.navigate(['cart'], {
      state: {param: this.cartItems}
    });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  private clear(){
    this.cartItems = [];
  }

}
