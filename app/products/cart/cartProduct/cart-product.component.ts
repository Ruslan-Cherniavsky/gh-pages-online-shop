import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { Subscription } from "rxjs";
import { AuthService } from 'src/app/main/auth/auth.service';



@Component({
  selector: 'app-cart-product',
  templateUrl: 'cart-product.component.html',
  styleUrls: ['cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input() cartProduct: any;
  @Input() cartId: string;
  public cartIdSub: Subscription;
  constructor(public cartService: CartService) {
  }

  ngOnInit() {
  }

  async deleteProduct(cartProduct, productId: string, cardId: string) {
    await this.cartService.removeFromProductCart(productId)
    await this.cartService.getCartProductsAsync(cardId)
  }

}


