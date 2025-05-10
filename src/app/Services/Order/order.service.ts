import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  token: any;
  constructor(private http: HttpService) {
    this.token = localStorage.getItem('token');
  }

  placeOrder() {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.http.PostService(
      'http://localhost:5000/api/order/placeorder',
      null,
      true,
      headers
    );
  }

  addCustomerDetails(reqData: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.http.PostService(
      'http://localhost:5000/api/Customer/add-or-update',
      reqData,
      true,
      headers
    );
  }

  getOrder() {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.http.getService(
      'http://localhost:5000/api/order/getall',
      true,
      headers
    );
  }
}
