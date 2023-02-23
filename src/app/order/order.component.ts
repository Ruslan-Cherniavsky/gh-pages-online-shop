import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription, } from "rxjs";
import { AuthService } from 'src/app/main/auth/auth.service';
import { CartService } from 'src/app/products/cart/cart.service';
import { OrderListComponent } from './order-list/order-list.component';

@Component({
  selector: 'app-order', // <app-post-create></app-post-create>
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewInit { // app.module.ts registration
  public userIdSub: Subscription;
  public cartIdSub: Subscription;
  public cartSub: Subscription;
  public cartLength: number

  @ViewChild(OrderListComponent) list;

  public userId: string
  public cartId: string
  public listComponent: any
  public orderSent: boolean = false
  public totalPrice = 0
  public currentCart: Array<{ _id: string, price: string, quantity: number, totalPrice: number, productId: object }>

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
        })
      })
    })


    try {
      await this.authService.setUserData()
    } catch (err) {
      console.log(err)
    }
  }

  getTotalPrice(cart: any) {
    let totalPrice = 0
    cart.map((cartProduct) => {
      totalPrice += cartProduct.totalPrice
    })
    return totalPrice
  }

  ngAfterViewInit() {
    setTimeout(() => { //some issue fix
      this.listComponent = this.list
    }, 1);
  }

  ngOnDestroy(): void {
    this.userIdSub.unsubscribe();
    this.cartIdSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

}

