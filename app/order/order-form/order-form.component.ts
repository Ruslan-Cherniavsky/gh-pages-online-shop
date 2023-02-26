import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/main/auth/auth.service";
import { CartService } from "src/app/products/cart/cart.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  public order: { city: string, street: string, shippingDate: Date, creditCard: number, userId: string, cartId: string, }
  isLoading = false
  @Input() userId: string
  @Input() cartId: string
  @Input() listComponent: any

  public errorStatus: any
  public orderSent: boolean = false
  public options: { city: string, street: string }
  public cardvalidation = true
  constructor(public cartService: CartService, public authService: AuthService , public router: Router) { }
  async ngOnInit() {
    const userData = await this.authService.getUserData()
    this.options = userData
  }
  async onOrderSend(orderForm: NgForm, userId: string, cartId: string) {
    if (orderForm.invalid) {
      return
    }
    this.isLoading = true
    this.cardvalidation = this.cardVlidator(orderForm.value.creditCard)
    if (!this.cardvalidation) {
      this.isLoading = false
      this.cardvalidation = false
      return
    }

    try {
      await this.cartService.sendOrder(
        orderForm.value.city,
        orderForm.value.street,
        orderForm.value.shippingDate,
        orderForm.value.creditCard,
        userId,
        cartId
      )
    }
    catch (error) {
      this.isLoading = false
      this.errorStatus = error.status
      console.log(this.errorStatus)
    }
    this.isLoading = false
    this.orderSent = true
  }
  async downloadOrderFileNow() {
    this.listComponent.downloadOrderFile()
  }

  cardVlidator(str) {

    const regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

    if (regexp.test(str)) {
      return true;
    }
    else {
      return false;
    }
  }

  backToShopping(){
    this.router.navigate(["/products"]);
  }
}
