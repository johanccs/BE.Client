import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  offLineMsg: string = "Offline";
  isOffline: boolean = true;
  cartTotal: number = 0;
  cartSubTotal: number = 0;
  cartVat: number = 0;
  vatRate: number = 0.15;
  
  constructor() { }

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotal();
  }

  private loadCartItems(){
    this.cartItems = window.history.state.param;
  }

  increaseQty(cartItem: CartItem){
    cartItem.qty += 1;
    this.calculateTotal();
  }

  decreaseQty(cartItem: CartItem){

    if(cartItem.qty === 0){
      return;
    }

    cartItem.qty -= 1;
    this.calculateTotal();
  }

  remove(cartItem: CartItem){
    
    let index = this.cartItems.indexOf(cartItem);

    this.cartItems.splice(index,1);

    this.calculateTotal();
  }

  calculateTotal(){
    
    this.cartTotal = 0;
    this.cartItems.forEach(x=> {
      
      this.cartTotal += (x.price * x.qty);

      this.cartVat = this.cartTotal - (this.cartTotal / (this.vatRate + 1));

      this.cartSubTotal = this.cartTotal - this.cartVat;

    });
  }

}
