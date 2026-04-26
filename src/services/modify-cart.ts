import { Injectable } from '@angular/core';
import { Product } from '../product-list/product-list';

@Injectable({
  providedIn: 'root'
})

export class ModifyCartService {

  private buyList: Product[] = [];

  constructor() {
    this.loadCart();
  }


  public addItem(p: Product) {
    this.buyList.push(p);
    this.saveCart();
  }

  public removeItem(p: Product) {
    const index = this.buyList.findIndex(item => item.id === p.id);
    if (index >= 0)
      this.buyList.splice(index, 1)
    this.saveCart();
  }

  public numberOfItems() {
    return this.buyList.length;
  }

  public getBuyList() {
    return [...this.buyList];
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.buyList = JSON.parse(savedCart);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.buyList));
  }
}
