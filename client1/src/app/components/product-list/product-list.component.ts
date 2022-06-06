import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/Helpers/dataService';
import { InternalCartService } from 'src/app/Helpers/internalCartService';
import { ListProduct } from 'src/app/models/list-product';
import { NewCartItem } from 'src/app/models/new-cartItem';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [MessageService]
})
export class ProductListComponent implements OnInit {

  products: ListProduct[] = [];
  selectedCartItems: NewCartItem[] = [];

  offLineMsg: string = "Offline";
  isOffline: boolean = true;

  constructor(
    private router: Router,
    private prodService: ProductService,
    private dataService: DataService,
    private internCart: InternalCartService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(){
    this.prodService.getProducts().subscribe(data => {
      this.products = data as ListProduct[];
      this.isOffline = !(this.products.length > 0);
    });
  }

  addToCart(prod: ListProduct){
    let userId = localStorage.getItem("userId");
    let cartItem = new NewCartItem(prod.id, userId,'0', prod.img, prod.name, 1, prod.price);

    this.selectedCartItems.push(cartItem);
    this.offLineMsg = this.selectedCartItems.length.toString();
    this.dataService.setData = this.selectedCartItems.length;
    this.internCart.setData = cartItem;
  }

  goToToCart(){
    if (this.selectedCartItems.length == 0) {
      this.showError("Warning", 'Nothing in your shopping cart');
      return;
    }

    this.router.navigate(['cart'], {
      state: {param: this.selectedCartItems}
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
