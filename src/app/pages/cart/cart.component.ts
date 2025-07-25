import { Component } from '@angular/core';
import {  CartService } from '../../core/services/cart/cartservice.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ICartItem } from '../../shared/ICartItem/icart-item';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems;
  total;
  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.cart;
    this.total = this.cartService.total;
  }

  increase(item: ICartItem) {
    this.cartService.updateQuantity(item.productId, item.quantity + 1);
  }

  decrease(item: ICartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId, item.quantity - 1);
    }
  }

  remove(item: ICartItem) {
    this.cartService.removeFromCart(item.productId);
    Swal.fire(
      'Deleted!',
      'The product has been removed.',
      'success'
    );
  }

  checkout() {
    // Implement your checkout logic here
    this.cartService.clearCart();
    Swal.fire({
      icon: 'success',
      title: 'Checkout successful!',
      text: `Total amount: ${this.total()}`,
      confirmButtonText: 'OK'
    });
  }
}
