// src/app/core/services/cart.service.ts
import { Injectable, signal, WritableSignal, computed, effect } from '@angular/core';
import { ICartItem } from '../../../shared/ICartItem/icart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart';


  cart: WritableSignal<ICartItem[]> = signal(this.loadCartFromStorage());


  total = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  constructor() {

    effect(() => {
      const currentCart = this.cart();
      localStorage.setItem(this.storageKey, JSON.stringify(currentCart));
    });
  }

  private loadCartFromStorage(): ICartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  addToCart(product: any) {
    const current = this.cart();
    const existing = current.find(i => i.productId === product.id);

    let updatedCart: ICartItem[];

    if (existing) {
      updatedCart = current.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...current,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        }
      ];
    }

    this.cart.set(updatedCart);
  }

  removeFromCart(productId: number) {
    const updated = this.cart().filter(item => item.productId !== productId);
    this.cart.set(updated);
  }

  updateQuantity(productId: number, quantity: number) {
    const updated = this.cart().map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    this.cart.set(updated);
  }

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem(this.storageKey);
  }
}
