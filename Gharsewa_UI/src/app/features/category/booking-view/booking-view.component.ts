import { Component, OnInit } from '@angular/core';
import { GharSewaService } from '../services/ghar-sewa.service';
import { bookserviceModel, viewAllBookingsModel } from '../models/userLoginModel';
import { tokenModel } from '../models/tokenModel';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-view',
  standalone: true,
  imports: [RouterModule, CommonModule, ToastrModule],
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent {
  bookings: viewAllBookingsModel[] = [];
  user: tokenModel | null = null;

  constructor(private gharSewaService: GharSewaService, private toastr: ToastrService) {
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
      next: (data: viewAllBookingsModel[]) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }

  Delete(id: number,): void {
    const userId = this.user.userId;
    const confirmation = window.confirm('Are you sure you want to delete this booking?');
    if (confirmation) {
      this.gharSewaService.deleteBooking(id).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.loadBookings(userId)
        }
      })
    }
  }
}


