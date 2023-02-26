import { Component, EventEmitter, InjectionToken, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/main/auth/auth.service";
import { ProductsService } from "../products.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  switched = true
  adderI: {
    name: string,
    price: string,
    image: string,
    categoryId: string
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
    })
  }

  async onAdd(addForm: NgForm) {
    if (addForm.invalid) {
      return
    }

    this.isLoading = true
    const adder = {
      name: addForm.value.name,
      price: addForm.value.price,
      image: addForm.value.image,
      categoryId: '6349ab2e2939e4d9b2b0f6e1'
    }
    try {
      console.log(adder)
      const response = await this.productService.addProduct(adder)
      console.log(response)
    }
    catch (error) {
      this.isLoading = false
      this.errorStatus = error.status
      console.log(error)
    }

    this.isLoading = false
    this.updated = true
    setTimeout(() => { this.updated = false }, 2000);


  }
  ngOnDestroy(): void {
  }

}

