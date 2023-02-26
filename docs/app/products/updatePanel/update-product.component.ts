import { Component, EventEmitter, InjectionToken, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/main/auth/auth.service";
import { ProductsService } from "../products.service";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  switched = true

  updaterI: {
    name: string,
    price: string,
    image: string
  }

  isLoading = false
  updated = false

  confirmPassword: number
  errorStatus: number
  public adminProductSub: Subscription
  public productToUpdate: any
  public price: string
  public name: string
  public image: string

  constructor(public authService: AuthService, public productService: ProductsService) { }

  ngOnInit(): void {
    this.adminProductSub = this.productService.getProductToUpdate().subscribe(adminProduct => {
      this.productToUpdate = adminProduct
      this.price = this.productToUpdate.price
      this.name = this.productToUpdate.name
      this.image = this.productToUpdate.image
    })
  }

  async onUpdate(updateForm: NgForm) {
    if (updateForm.invalid) {
      return
    }
    this.isLoading = true
    const updater = {
      name: updateForm.value.name,
      price: updateForm.value.price,
      image: updateForm.value.image
    }

    try {
      const response = await this.productService.updateProduct(this.productToUpdate.id, updater)

    }
    catch (error) {
      this.isLoading = false
      this.errorStatus = error.status
      console.log(this.errorStatus)
    }

    this.isLoading = false
    this.updated = true
    setTimeout(() => { this.updated = false }, 2000);
  }

  ngOnDestroy(): void {
  }
}

