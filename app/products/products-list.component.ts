import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Products } from "./products.model";
import { ProductsService } from "./products.service";
import { Subject, Subscription, firstValueFrom } from 'rxjs'
import { PageEvent } from "@angular/material/paginator";
import { CartService } from "./cart/cart.service";
import { AuthService } from "../main/auth/auth.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  // products = [
  //   { title: 'First Post', content: 'This is the first products content' },
  //   { title: 'Second Post', content: 'This is the second products content' },
  //   { title: 'Third Post', content: 'This is the third products content' }
  // ];
  //@Input()


  public products: Products[] = [];

  isLoading = false;
  addStatus = false
  totalproducts = 0
  productsPerPage = 10
  pageSizeOptions = [1, 2, 5, 10]
  currentPage = 1

  public userRole: string
  public userRoleSub: Subscription
  private productsSub: Subscription;

  constructor(public productsService: ProductsService, public cartService: CartService, public authService: AuthService) { }

  async ngOnInit() {
    this.isLoading = true;

    try {
      const result = await this.authService.setUserData()

    } catch (error) {
      console.log(error)
    }

    this.userRoleSub = this.authService.getUserRole().subscribe(role => {
      this.userRole = role
    })

    this.productsService.getproducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.productsService.getPostUpdateListener().subscribe((productsData: { products: Products[], productsCount: number }) => {
      this.isLoading = false;
      this.totalproducts = productsData.productsCount
      this.products = productsData.products;
    });
  }

  async getProductsByCategoryServer(categoryId: string) {
    this.isLoading = true;






    this.productsService.getproductsByCategory(this.productsPerPage, this.currentPage, categoryId);
    this.productsSub = this.productsService.getPostUpdateListener().subscribe((productsData: { products: Products[], productsCount: number }) => {
      this.isLoading = false;
      this.totalproducts = productsData.productsCount
      this.products = productsData.products;
      this.authService.setUserData()

    });



  }



  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize
    this.productsService.getproducts(this.productsPerPage, this.currentPage);
  }

  onDelete(productsId: string) {
    this.isLoading = true
    this.productsService.deleteProduct(productsId).subscribe(() => {
      this.productsService.getproducts(this.productsPerPage, this.currentPage);
    });
  }

  switchToAdd() {
    this.addStatus = !this.addStatus
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
