import { Component, OnInit, Input, EventEmitter, Output, ComponentFactoryResolver } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/main/auth/auth.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  public userRole: string
  public userRoleSub: Subscription
  public cartIdSub: Subscription;
  public isLoading: boolean
  public productId: string
  public quantity = 1
  cartId: string

  public productAddPopup = false
  constructor(public cartService: CartService, public authService: AuthService, public productsService: ProductsService) {

  }

  async ngOnInit() {
    this.isLoading = true;
    this.authService.setUserData()

    this.cartIdSub = this.cartService.getCartId().subscribe(userCartId => {
      this.cartId = userCartId
    })

    this.userRoleSub = this.authService.getUserRole().subscribe(role => {
      this.userRole = role
    })

    this.isLoading = false;
  }

  productAddPopupOn() {
    this.productAddPopup = true
  }

  async addProducts(quantity: NgForm, productId: string) {
    this.quantity = quantity.control.value.quantity
    await this.cartService.addProductToCart(productId, this.cartId, this.quantity)
    await this.cartService.getCartProductsAsync(this.cartId)
    this.productAddPopup = false
  }

  updateProduct(product: any) {
    this.productsService.setProductToUpdate(product)
    console.log('ipdate me ')

  }
}


