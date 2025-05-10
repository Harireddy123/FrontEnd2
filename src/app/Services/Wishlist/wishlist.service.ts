import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  token: any;

  constructor(private http: HttpService) {
    this.token = localStorage.getItem('token');
  }

  getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  addToWishlist(bookId: number) {
    const body = { bookId };
    return this.http.PostService(
      'http://localhost:5000/api/wishlist/add',
      body,
      true,
      this.getAuthHeaders()
    );
  }

  removeFromWishlist(wishlistId: number) {
    return this.http.deleteService(
      `http://localhost:5000/api/wishlist/remove/${wishlistId}`, // Correct URL format
      true,
      this.getAuthHeaders()
    );
  }

  getWishList() {
    return this.http.getService(
      'http://localhost:5000/api/wishlist/getall',
      true,
      this.getAuthHeaders()
    );
  }
}
