import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/Helpers/dataData';
import { OrderNrGenerator } from 'src/app/Helpers/ordernr-generator';
import { NewCartItem } from 'src/app/models/new-cartItem';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {

  cartItems: NewCartItem[] = [];
  cartTotal: number = 0;
  cartSubTotal: number = 0;
  cartVat: number = 0;
  vatRate: number = 0.15;
  buttonCaption: string = 'Pay';

  constructor(
    private cartService: CartService,
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotal();
  }

  private loadCartItems(){
    this.cartItems = window.history.state.param;
  }

  increaseQty(cartItem: NewCartItem){
    cartItem.qty += 1;
    this.calculateTotal();
  }

  decreaseQty(cartItem: NewCartItem){

    if(cartItem.qty === 0){
      return;
    }

    cartItem.qty -= 1;
    this.calculateTotal();
  }

  remove(cartItem: NewCartItem){
    
    let index = this.cartItems.indexOf(cartItem);

    this.cartItems.splice(index,1);

    this.calculateTotal();

    this.dataService.setData = this.cartItems.length;
  }

  calculateTotal(){
    
    this.cartTotal = 0;
    this.cartSubTotal = 0;
    this.cartVat = 0;

    if (this.cartItems == null) {
      return;
    }
      
    this.cartItems.forEach(x=> {
      
      this.cartTotal += (x.price * x.qty);

      this.cartVat = this.cartTotal - (this.cartTotal / (this.vatRate + 1));

      this.cartSubTotal = this.cartTotal - this.cartVat;
    });
  }

  addOrderNr(){
    this.cartItems.forEach(x => {
      return x.orderNr = OrderNrGenerator.Generate();
    })
  }

  submit(){
    this.buttonCaption = 'Please wait...';
    this.addOrderNr();
    this.cartService.Checkout(this.cartItems).subscribe(data => {
      this.buttonCaption = 'Pay';
      this.showSuccess('Payment made', 'Payment completed. Email sent');

      setTimeout(() => {
        this.router.navigate(['products']);
      }, 2000);
    }, err => {
      this.showError("Error", err.error);
    });
  }

  showSuccess(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'success', summary: summaryArg, detail: detailArg});
  }

  showError(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'error', summary: summaryArg, detail: detailArg});
  }

  showBusy(){
    this.messageService.add({key: 't1', severity: 'warn', summary: 'Is  Busy', detail: 'Signing in. Please wait...'});
  }
}
