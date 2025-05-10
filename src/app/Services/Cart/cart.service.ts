import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  token: any;
  constructor(private http: HttpService) {
    this.token = localStorage.getItem('token');
  }

  addToCart(bookId: number, quantity: number = 1) {
    const body = {
      bookId: bookId,
      quantity: quantity,
    };

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.http.PostService(
      `http://localhost:5000/api/cart/add`,
      body, // ✅ send payload, not null
      true,
      headers
    );
  }

  getCart() {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.getService(
      'http://localhost:5000/api/cart',
      true,
      headers
    );
  }

  updateCart(cartId: number, quantity: number) {
    const body = {
      bookId: 0, // Or the actual bookId you want to update, if necessary
      quantity: quantity,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.putService(
      `http://localhost:5000/api/cart/update?cartId=${cartId}`, // Include cartId in query parameters
      body, // Send bookId and quantity in the body
      true,
      headers
    );
  }

  removeItem(bookId: number) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.deleteService(
      `http://localhost:5000/api/cart/${bookId}`,
      true,
      headers
    );
  }
}
