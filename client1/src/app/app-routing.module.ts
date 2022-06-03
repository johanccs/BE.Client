import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginHomeComponent } from './components/security/login-home/login-home.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

import { CanActivateGuard } from './router-guards/can-activate.guard';
import { CanDeactivateNewCreditCardGuard } from './router-guards/can-deactivate-new-credit-card-guard';

const routes: Routes = [
  {
    path: 'login', component: LoginHomeComponent
  },
  {
    path: 'products', component: ProductListComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'user', component: UserManagementComponent
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: LoginHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
