import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tokenModel } from '../models/tokenModel';
import { viewAllBookingsModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-view-all-bookings',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './view-all-bookings.component.html',
  styleUrl: './view-all-bookings.component.css'
})
export class ViewAllBookingsComponent {
  bookings: viewAllBookingsModel[] = [];
  user: tokenModel | null = null;

  constructor(private gharSewaService: GharSewaService) {
    this.onload();
  }

  onload(): void {
    this.user = this.gharSewaService.getUserInfo();
    if (this.user?.userId) {
      
      this.loadBookings();
    }
  }

  loadBookings(): void {
    this.gharSewaService.getAllBookings().subscribe({
      next: (data: viewAllBookingsModel[]) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }
}
