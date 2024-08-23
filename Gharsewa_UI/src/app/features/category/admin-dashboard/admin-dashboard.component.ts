import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { addServicesModel, AdminStats } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // styleUrl -> styleUrls
})
export class AdminDashboardComponent {
  stats: AdminStats;
  categories: addServicesModel[] = [];

  constructor(public gharSewaService: GharSewaService, private router: Router) { // Changed RouterModule to Router
    this.stats = {
      approvedBookingsCount: NaN,
      unapprovedBookingsCount: NaN,
      categoryCount: NaN
    }
    this.onload();
  }

  navigateToBookingService() {
    if (this.gharSewaService.isUser()) {
      this.router.navigate(['/user/dashboard/book-service']);
    }
  }

  onload(): void {
    this.gharSewaService.getallcategory().subscribe({
      next: (data: addServicesModel[]) => {
        this.categories = data;
      }
    });

    this.gharSewaService.getStats().subscribe({
      next: (data: AdminStats) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }
}
