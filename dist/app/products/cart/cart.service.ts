import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private totalPrice: number = 0
  private cartIdListener = new Subject<string>()
  private cartListener = new Subject<Array<any>>()
  private cart: Array<any>;
  public errorMessage: string
  constructor(private http: HttpClient) {
  }

  getCartId() {
    return this.cartIdListener.asObservable()
  }
  getCart() {
    return this.cartListener.asObservable()
  }

  async createCart(userId: string) {
    await firstValueFrom(this.http.post('http://localhost:3000/carts/', { userId: userId }))
  }

  async getCartIdServer(userId: string) {
    this.http.get<{ cartId: string }>('http://localhost:3000/carts/byuserid/' + userId).subscribe((result) => {
      const cartId = result.cartId
      return this.cartIdListener.next(cartId)
    })
  }

  async addProductToCart(productId: string, cartId: string, quantity: number) {
    await firstValueFrom(this.http.post('http://localhost:3000/cartproducts', { productId: productId, quantity: quantity, cartId: cartId, }))
  }

  async sendOrder(city: string, street: string, shippingDate: Date, creditCard: number, userId: string, cartId: string,) {
    try {
      const result = await firstValueFrom(this.http.post('http://localhost:3000/orders', { userId: userId, cartId: cartId, city: city, street: street, date: shippingDate, creditCard: creditCard }))
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  async getCartProductsAsync(cartId: string): Promise<any> {
    try {
      const result = await firstValueFrom(this.http.get<{ cartProducts: Array<any> }>('http://localhost:3000/cartproducts/cartId/' + cartId))
      this.cart = result.cartProducts
      return this.cartListener.next(result.cartProducts)
    } catch (ex) {
      this.errorMessage = "Something went wrong"
    } finally {
      return this.cart
    }
  }

  getTotalPrice() {
    return this.totalPrice
  }
  async removeFromProductCart(cartProductId: string) {
    await firstValueFrom(this.http.delete('http://localhost:3000/cartproducts/' + cartProductId))
  }
  async removeAllProductsFromCart(cartProductId: string) {
    await firstValueFrom(this.http.delete('http://localhost:3000/cartproducts/deleteallbycartid/' + cartProductId))
  }
}

