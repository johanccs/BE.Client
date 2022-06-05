import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewCartItem } from 'src/app/models/new-cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://localhost:5001/api/v1';

  constructor(private http: HttpClient) { }

  public Checkout(cartItems: NewCartItem[]){
    const url = `${this.apiUrl}/shoppingcart`;

    return this.http.post(url, cartItems);
  }
}
