import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';
import { SharedService } from '../../Services/Common/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../Services/Order/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalQuantity: any;
  totalCost: any;
  CustomerForm!: FormGroup;
  addressPanelOpen = false;
  summeryPanelOpen = false;

  constructor(
    private cartService: CartService,
    private sharedservice: SharedService,
    private orderservice: OrderService,
    private formbuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCartItems();
    // this.sharedservice.cartRefresh$.subscribe(()=>
    //   {
    //     this.fetchCartItems();
    //   })

    this.CustomerForm = this.formbuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required]],
      address: ['', Validators.required],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      ZipCode: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  fetchCartItems() {
    this.cartService.getCart().subscribe(
      (response: any) => {
        this.cartItems = response.data.cartItems;
        this.totalQuantity = response.data.totalQuantity;
        this.totalCost = response.data.totalCost;
        this.updateCartTotals(); // 💥 Add this line
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  increaseQuantity(item: any) {
    item.quantity += 1;

    this.cartService.updateCart(item.bookId, item.quantity).subscribe({
      next: (response) => {
        console.log('Quantity increased:', response);
        this.updateCartTotals();
      },
      error: (error) => {
        console.error('Error increasing quantity:', error);
      },
    });
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;

      this.cartService.updateCart(item.bookId, item.quantity).subscribe({
        next: (response) => {
          console.log('Quantity decreased:', response);
          this.updateCartTotals();
        },
        error: (error) => {
          console.error('Error decreasing quantity:', error);
        },
      });
    }
  }

  updateCartTotals() {
    this.totalCost = 0;
    this.totalQuantity = 0;

    this.cartItems.forEach((item) => {
      this.totalCost += item.book?.discountPrice * item.quantity;
      this.totalQuantity += item.quantity;
    });
  }

  addCustomerDetails() {
    this.CustomerForm.markAllAsTouched();

    const reqData = this.CustomerForm.value;

    this.orderservice.addCustomerDetails(reqData).subscribe({
      next: (res) => {
        console.log('Successful:', res);

        this.snackbar.open('Customer details added Successfully!', 'Close', {
          duration: 1500,
          panelClass: ['success-snackbar'],
        });
        this.openSummeryPanel();
      },

      error: (err) => {
        console.error(' Failed to add customerdetails', err);
      },
    });
  }

  placeOrder() {
    this.orderservice.placeOrder().subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        this.snackBar.open('Order placed successfully:!', '', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/success']);

        this.closeSummeryPanel();
      },
      error: (error) => {
        console.error('Error placing order:', error);
      },
    });
  }

  openSummeryPanel() {
    this.addressPanelOpen = true;
    this.summeryPanelOpen = true;
  }
  closeExpansion() {
    this.addressPanelOpen = false;
  }

  openAddressPanel() {
    this.addressPanelOpen = true;
  }
  closeSummeryPanel() {
    this.summeryPanelOpen = false;
  }
}
