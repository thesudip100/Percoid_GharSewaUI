import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { addServicesModel, AdminStats } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  stats: AdminStats;
  categories: addServicesModel[] = [];

  constructor(public gharSewaService: GharSewaService) {
    this.stats = {
      approvedBookingsCount: NaN,
      unapprovedBookingsCount: NaN,
      categoryCount: NaN
    }

   
    this.onload();
  }

  onload(): void {
    this.gharSewaService.getallcategory().subscribe({
      next: (data: addServicesModel[]) => {
        this.categories = data;
      }
    });

    this.gharSewaService.getStats().subscribe({
      next: (data:AdminStats) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

}
