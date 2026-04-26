import { Component } from '@angular/core';
import { Product } from '../product-list/product-list';
import { ModifyCartService } from '../services/modify-cart';

@Component({
  selector: 'app-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css'
})



export class ShoppingCartComponent {

  constructor(private modifyCart: ModifyCartService){
  }

  myProducts(){
    return this.modifyCart.getBuyList();
  }
  
  increaseQuantity(p: Product){
    this.modifyCart.addItem(p);
  }

  decreaseQuantity(p: Product){
    this.modifyCart.removeItem(p);
  }

  

}
