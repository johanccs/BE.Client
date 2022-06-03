import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedCartItems: CartItem[] = [];

  offLineMsg: string = "Offline";
  isOffline: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(){
    this.products.push(new Product(1, `../assets/boot-ang1.png`, "Angular Tekkies - Blue", 230, 2))
    this.products.push(new Product(2, `../assets/hat-core1.png`, "C# Beanie - Blue", 40, 20))
    this.products.push(new Product(3, `../assets/sb-core2.png`, "C# - Socks", 56, 12))
  }

  show(){}

  addToCart(prod: Product){

    let cartItem = new CartItem(0, prod.id, prod.img, prod.name, 1, prod.price);

    this.selectedCartItems.push(cartItem);
    this.offLineMsg = this.selectedCartItems.length.toString();
  }

  goToToCart(){
    this.router.navigate(['cart'], {
      state: {param: this.selectedCartItems}
    });
  }

}
