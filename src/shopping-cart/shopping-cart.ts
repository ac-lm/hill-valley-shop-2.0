import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe} from '@angular/common';
import { Product } from '../product-list/product-list';
import { ModifyCartService } from '../services/modify-cart';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})

export class ShoppingCartComponent {
  cartSignal = signal<Product[]>([]);

  cartTotal = computed(() => {
    return this.cartSignal().reduce((total, product) => {
      return total + ((product.price || 0) * (product.quantity || 1));
    }, 0);
  });

  cartItemCount = computed(() => {
    return this.cartSignal().reduce((count, product) => {
      return count + (product.quantity || 1);
    }, 0);
  });

  constructor(private modifyCart: ModifyCartService) {
    this.refreshCart();
  }

  private refreshCart() {
    this.cartSignal.set([...this.modifyCart.getBuyList()]);
  }

  increaseQuantity(p: Product) {
    this.modifyCart.addItem(p);
    this.refreshCart();
  }

  decreaseQuantity(p: Product) {
    this.modifyCart.removeItem(p);
    this.refreshCart();
  }

  removeAll(p: Product) {
    this.modifyCart.removeAllOcurrences(p);
    this.refreshCart();
  }

  productSet() {
    return this.cartSignal();
  }

  isCartEmpty() {
    return this.cartSignal().length === 0;
  }
}




