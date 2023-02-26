import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-statistics', // <app-post-create></app-post-create>
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit { // app.module.ts registration

  totalProducts: number
  totalOrders: number

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ totalProducts: number }>('http://localhost:3000/statistics/products')
      .subscribe((statisticsData) => {
        this.totalProducts = statisticsData.totalProducts;
      })
    this.http.get<{ totalOrders: number }>('http://localhost:3000/statistics/orders')
      .subscribe((statisticsData) => {
        this.totalOrders = statisticsData.totalOrders;
      })
  }
}
