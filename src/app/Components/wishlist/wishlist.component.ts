import { Component } from '@angular/core';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  wishlistArray: any[] = [];

  constructor(private wishlistservice: WishlistService) {}

  ngOnInit(): void {
    this.getWishlistItems();
  }

  getWishlistItems() {
    this.wishlistservice.getWishList().subscribe({
      next: (response: any) => {
        console.log('Wishlist response:', response); // Log the response data
        if (response.success && Array.isArray(response.data)) {
          this.wishlistArray = response.data
            .reverse()
            .map((item: any, index: number) => ({
              ...item,
              wishlistId: item.wishlistId, // Ensure wishlistId is passed correctly
              bookImage:
                item.book?.bookImage || `images/book${(index % 9) + 1}.png`,
            }));
          console.log('Wishlist items:', this.wishlistArray);
        } else {
          console.error('Invalid response format: data is not an array');
        }
      },
      error: (error) => {
        console.error('Error fetching wishlist:', error);
      },
    });
  }

  removeFromWishlist(item: any) {
    console.log('Item to remove:', item); // Log the item to check if wishlistId is present
    if (!item || !item.wishlistId) {
      console.error('Invalid item or wishlistId:', item);
      return;
    }

    const wishlistId = item.wishlistId;
    console.log('Removing book with wishlistId:', wishlistId);

    // Call service to remove the book from wishlist
    this.wishlistservice.removeFromWishlist(wishlistId).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Remove the book from the local wishlist array
          this.wishlistArray = this.wishlistArray.filter(
            (item) => item.wishlistId !== wishlistId
          );
          console.log('Updated wishlist:', this.wishlistArray);
        } else {
          console.error(
            'Failed to remove book from wishlist:',
            response.message
          );
        }
      },
      error: (error) => {
        console.error('Error removing book from wishlist:', error);
      },
    });
  }
}
