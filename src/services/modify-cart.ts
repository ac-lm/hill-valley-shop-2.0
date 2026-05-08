import { Injectable } from '@angular/core';
import { Product } from '../product-list/product-list';

@Injectable({
  providedIn: 'root'
})

export class ModifyCartService {

  private buyList: Map<number, Product> = new Map();

  constructor() {
    this.loadCart();
  }


  public addItem(p: Product) {
    const existing = this.buyList.get(p.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.buyList.set(p.id, { ...p, quantity: 1 });
    }
    this.saveCart();
  }

  public removeItem(p: Product) {
    const existing = this.buyList.get(p.id);
    if (existing) {
      if (existing.quantity && existing.quantity > 1) {
        existing.quantity--;
      } else {
        this.buyList.delete(p.id);
      }
    }
    this.saveCart();
  }

  public numberOfItems() {
    let total = 0;
    this.buyList.forEach(product => {
      total += product.quantity || 1;
    });
    return total;
  }

  public getBuyList() {
    return Array.from(this.buyList.values());
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        this.buyList.clear();
        if (Array.isArray(parsed)) {
          // Convertir array de la vieja estructura a Map
          parsed.forEach((product: Product) => {
            if (product.id) {
              this.buyList.set(product.id, product);
            }
          });
        } else if (typeof parsed === 'object') {
          // Convertir objeto a Map
          Object.values(parsed).forEach((product: any) => {
            if (product.id) {
              this.buyList.set(product.id, product);
            }
          });
        }
      } catch (e) {
        console.error('Error loading cart:', e);
        this.buyList.clear();
      }
    }
  }

  private saveCart(): void {
    const products: {[key: number]: Product} = {};
    this.buyList.forEach((value, key) => {
      products[key] = value;
    });
    localStorage.setItem('cart', JSON.stringify(products));
  }


  public removeAllOcurrences(p: Product){
    this.buyList.delete(p.id);
    this.saveCart();
  }


}
