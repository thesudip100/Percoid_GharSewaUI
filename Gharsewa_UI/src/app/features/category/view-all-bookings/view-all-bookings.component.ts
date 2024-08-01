import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tokenModel } from '../models/tokenModel';
import { viewAllBookingsModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-all-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './view-all-bookings.component.html',
  styleUrls: ['./view-all-bookings.component.css']
})
export class ViewAllBookingsComponent {
  bookings: viewAllBookingsModel[] = [];
  user: tokenModel | null = null;

  constructor(private gharSewaService: GharSewaService, private toastr: ToastrService, private router: Router) {
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

  Delete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this booking?');
    if (confirmation) {
      this.gharSewaService.deleteBooking(id).subscribe({
        next:(response)=>{   
         this.toastr.success(response.message)
         this.loadBookings();
        }
      });
    }
  }
}
