import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: false,
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/dashboard/home']);
  }
}
