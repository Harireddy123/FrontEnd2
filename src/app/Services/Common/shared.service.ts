import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../Cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  private cartItems: any[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private cartService: CartService) {}
  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  updateCartCountFromBackend() {
    this.cartService.getCart().subscribe({
      next: (response: any) => {
        const count = response.items ? response.items.length : 0;
        this.cartCount.next(count);
      },
      error: () => {
        this.cartCount.next(0); // fallback
      },
    });
  }
}
