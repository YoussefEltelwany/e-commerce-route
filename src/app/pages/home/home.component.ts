import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ShowprouductService } from '../../core/services/showproduct/showprouduct.service';
import { Iproduct } from '../../shared/Iproduct/iproduct';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart/cartservice.service';


@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  prouducts: WritableSignal<Iproduct[]> = signal([])
  private readonly showprouductService = inject(ShowprouductService);
  private readonly cartService = inject(CartService);

  searchText: string = '';
  constructor() { }

  ngOnInit(): void {
    this.showprouductService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.prouducts.set(data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }


  addToCart(product: any) {
    this.cartService.addToCart(product);
    Swal.fire({
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  getProductById(productId: number): void {
    console.log(`Product with ID ${productId} added to cart.`);
    // Implement your add to cart logic here
    this.showprouductService.getProductById(productId).subscribe({
      next: (product) => {
        console.log('Product details:', product);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    })
  }
}
