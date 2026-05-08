import { Routes } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart', component: ShoppingCartComponent }
];
