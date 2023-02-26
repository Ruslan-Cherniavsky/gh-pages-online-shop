import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoginComponent } from '../app/main/auth/login/login.component'
import { MainComponent } from '../app/main/main.component'
import { StatisticsComponent } from '../app/main/statistics/statistics.component'
import { WellcomeComponent } from '../app/main/wellcome/wellcome.component'
import { NotificationsComponent } from '../app/main/statistics/notifications/notifications.component'
import { AuthComponent } from './main/auth/auth.component';
import { SignupComponent } from './main/auth/signup/signup.component';
import { AuthInterceptor } from './main/auth/auth.interceptor';
import { ProductsListComponent } from './products/products-list.component';
import { ProductComponent } from './products/product/product.component';
import { CategoriesComponent } from './products/category/categories-list.component';
import { CartComponent } from './products/cart/cart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CartProductComponent } from './products/cart/cartProduct/cart-product.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderFormComponent } from './order/order-form/order-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { UpdateProductComponent } from './products/updatePanel/update-product.component';
import { AddProductComponent } from './products/addPanel/add-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    StatisticsComponent,
    WellcomeComponent,
    NotificationsComponent,
    AuthComponent,
    SignupComponent,
    ProductsListComponent,
    ProductComponent,
    CategoriesComponent,
    CartComponent,
    CartProductComponent,
    OrderComponent,
    OrderListComponent,
    OrderFormComponent,
    UpdateProductComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
