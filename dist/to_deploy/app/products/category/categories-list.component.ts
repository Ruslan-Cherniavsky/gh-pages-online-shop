import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/main/auth/auth.service';
import { Products } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() productObjInput: any;
  @Input() getProductsByCategoryServer: Function


  public categories: any

  totalproducts = 0
  productsPerPage = 10
  pageSizeOptions = [1, 2, 5, 10]
  currentPage = 1

  constructor(public productsService: ProductsService, private authService: AuthService) { }
  async ngOnInit() {
    this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories['categories']
    })
  }
}

