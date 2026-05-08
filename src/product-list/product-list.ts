import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ModifyCartService } from '../services/modify-cart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


export interface Product{
    id: number;
    name: string;
    price: number;
    image: string;
    quantity?: number;
}

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})

export class ProductListComponent {
  private localId: number = 1;

  products: Product[] = [
    {id: this.generateId(), name: "Flying hoverboard", price: 30.5, 
    image: '..//public/img/Hoverboard.jpg'},

    {id: this.generateId(), name: 'Flux Capacitor', price: 149.99, image: '..//public/img/flux-capacitor.jpg'},
  
    {id: this.generateId(), name: 'Grays sports almanac', price: 20.0, image: '..//public/img/almanac.jpg'},

    {id: this.generateId(), name: "50's outfit", price: 15.99, image: '..//public/img/marty-mcfly-1955-jacket.jpg'},

    {id: this.generateId(), name: 'Plutonium', price: 230.0, image: '..//public/img/Plutonium_Case.jpg'},

    //{id: this.generateId(), name: 'test', price: 89.99, image: '..//public/img/test.jpg'}
  ];

  constructor(private modifyCart: ModifyCartService, private snackBar: MatSnackBar, private router: Router) {}

  addToCart(p: Product){
    this.modifyCart.addItem(p);
    this.showNotification("Added " + p.name + " to cart!");
  }

  private generateId(){
    return this.localId++;
  }

  private showNotification(message: string) {
    this.snackBar.open(message, 'Go to Cart', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    }).onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
}



