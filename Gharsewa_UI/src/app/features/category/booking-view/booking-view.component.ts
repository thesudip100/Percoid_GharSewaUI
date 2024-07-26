import { Component, OnInit } from '@angular/core';
import { GharSewaService } from '../services/ghar-sewa.service';
import { bookserviceModel } from '../models/userLoginModel';
import { tokenModel } from '../models/tokenModel';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-view',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent {
  bookings: bookserviceModel[] = [];
  user: tokenModel | null = null;

  constructor(private gharSewaService: GharSewaService) {
    this.onload();
  }

  onload(): void {
    this.user = this.gharSewaService.getUserInfo();
    if (this.user?.userId) {
      this.loadBookings(this.user.userId);
    }
  }

  loadBookings(id: number): void {
    this.gharSewaService.getBookings(id).subscribe({
      next: (data: bookserviceModel[]) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }
}

