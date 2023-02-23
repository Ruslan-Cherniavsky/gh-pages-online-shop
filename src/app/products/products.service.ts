import { Injectable } from "@angular/core";
import { Subject, firstValueFrom } from "rxjs";
import { Products } from "./products.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Products[] = [];
  private productsUpdated = new Subject<{ products: Products[], productsCount: number }>();
  public adminProductListener = new Subject<{}>();
  constructor(private http: HttpClient, private router: Router) { }
  getproducts(productsPerPage: number, currentPage: any) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`
    this.http.get<{ message: string, products: any, maxproducts: number }>('http://localhost:3000/products/pagin' + queryParams)
      .pipe(map(productsData => {
        return {
          products: productsData.products.map(products => {
            return {
              name: products.name,
              price: products.price,
              id: products._id,
              image: products.image
            };
          }), maxproducts: productsData.maxproducts
        }
      }))
      .subscribe((transformedProductsData) => {
        this.products = transformedProductsData.products;
        this.productsUpdated.next({ products: [...this.products], productsCount: transformedProductsData.maxproducts });
      });
  }
  async getproductsByCategory(productsPerPage: number, currentPage: any, category: string) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`
    await this.http.get<{ message: string, products: any, maxproducts: number }>(`http://localhost:3000/products/bycategory/${category}${queryParams}`)
      .pipe(map(productsData => {
        return {
          products: productsData.products.map(products => {
            return {
              name: products.name,
              price: products.price,
              id: products._id,
              image: products.image
            };
          }), maxproducts: productsData.maxproducts
        }
      }))
      .subscribe((transformedProductsData) => {
        this.products = transformedProductsData.products;
        this.productsUpdated.next({ products: [...this.products], productsCount: transformedProductsData.maxproducts });
      });
  }
  getPostUpdateListener() {
    return this.productsUpdated.asObservable();
  }
  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string; }>('http://localhost:3000/products/' + id)
  }
  getProductByCategory(category) {
    return this.http.get<{ _id: string; title: string; content: string; }>('http://localhost:3000/products/bycetegory/' + category)
  }
  getCategories() {
    return this.http.get<{ _id: string; categoryName: string; }>("http://localhost:3000/categories")
  }
  updatedPost(id: string, title: string, content: string) {
    this.router.navigate(["/"]);
  }
  deleteProduct(productsId) {
    return this.http.delete('http://localhost:3000/products/' + productsId)
  }
  getProductToUpdate() {
    return this.adminProductListener.asObservable()
  }
  setProductToUpdate(product: any) {
    return this.adminProductListener.next(product)
  }
  async updateProduct(productId: string, updater: object) {
    const resut = await firstValueFrom(this.http.patch<{}>(`http://localhost:3000/products/${productId}`, updater))
  }
  async addProduct(adder: any) {
    const resut = await firstValueFrom<{}>(this.http.post('http://localhost:3000/products/', adder))
  }
}



