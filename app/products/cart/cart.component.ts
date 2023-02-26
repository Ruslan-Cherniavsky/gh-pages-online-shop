import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { Router } from "@angular/router";

import { CartService } from './cart.service';
import { Subscription, firstValueFrom } from "rxjs";
import { AuthService } from 'src/app/main/auth/auth.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public userIdSub: Subscription;
  public cartIdSub: Subscription;
  public cartSub: Subscription;
  public cartLength: number
  userId = ''
  public cartId: string
  public totalPrice = 0
  public cartIsNotEmpty = false
  public currentCart: Array<{}>

  constructor(public cartService: CartService, public authService: AuthService, private router: Router) {

  }

  async ngOnInit() {
    this.userIdSub = this.authService.getUserId().subscribe(userIdAuth => {
      this.userId = userIdAuth;
      if (!this.userId) { return }
      this.cartService.getCartIdServer(this.userId)
      this.cartIdSub = this.cartService.getCartId().subscribe(userCartId => {
        this.cartId = userCartId
        this.cartService.getCartProductsAsync(this.cartId)
        this.cartSub = this.cartService.getCart().subscribe(cart => {
          this.currentCart = cart
          this.cartLength = cart.length
          this.totalPrice = this.getTotalPrice(cart)
          this.cartIsNotEmpty = true
          if (cart.length === 0) {
            this.cartIsNotEmpty = false
          }
        })
        if (!this.cartId) {
          this.cartService.createCart(this.userId)
          this.cartService.getCartIdServer(this.userId)
          this.cartSub = this.cartService.getCart().subscribe(cart => {
            this.currentCart = cart
            this.cartLength = cart.length
            this.cartIsNotEmpty = true
          })
        }
      })
    })
  }


  getTotalPrice(cart: any) {
    let totalPrice = 0
    cart.map((cartProduct) => {
      totalPrice += cartProduct.totalPrice
    })
    return totalPrice
  }

  ngOnDestroy(): void {
    this.userIdSub.unsubscribe();
    this.cartIdSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

  createOrder() {
    this.router.navigate(["/order"]);
  }

  deleteAll(cartId: string) {
    this.cartService.removeAllProductsFromCart(cartId)
    this.cartService.getCartIdServer(this.userId)
  }
}
