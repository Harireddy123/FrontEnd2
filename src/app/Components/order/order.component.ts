import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/Order/order.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  ordersArray: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrder().subscribe({
      next: (response: any) => {
        this.ordersArray = response.data
          .reverse()
          .map((order: any, index: number) => ({
            ...order,
            bookImage: `images/book${(index % 9) + 1}.png`,
            totalPrice: order.discountPrice * order.quantity,
            originalPrice: order.price * order.quantity,
          }));
        console.log(this.ordersArray);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }
}
