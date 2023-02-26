import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-notifications', // <app-post-create></app-post-create>
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit { // app.module.ts registration

  totalProducts: number
  totalOrders: number

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}

