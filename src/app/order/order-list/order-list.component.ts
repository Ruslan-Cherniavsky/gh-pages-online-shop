import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @Input() currentCart: Array<{ _id: string, price: string, quantity: number, totalPrice: number, productId: object }>
  @Input() totalPrice: number
  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
  backToShopping() {
    this.router.navigate(["/products"]);
  }

  downloadOrderFile() {
    console.log("order downloaded")

    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        const date = Date.now()
        pdf.save('order----' + date + '.pdf')
      }
    })
  }
}

