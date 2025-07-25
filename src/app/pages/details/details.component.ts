import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowprouductService } from '../../core/services/showproduct/showprouduct.service';
import { Isingleproduct } from '../../shared/Isingelproduct/isingleproduct';
import { CartService } from '../../core/services/cart/cartservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  productID: any;
  singelProduct: Isingleproduct = {} as Isingleproduct;
  private readonly showprouductService = inject(ShowprouductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {

        console.log(params.get('id'));
        this.productID = params.get('id');
        this.showprouductService.getProductById(this.productID).subscribe({
          next: (product) => {
            console.log('Product details:', product);
            this.singelProduct = product;
          },
          error: (error) => {
            console.error('Error fetching product details:', error);
          }
        })

      },
      error: (error) => {
        console.error('Error fetching route parameters:', error);
      }
    })
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

}
