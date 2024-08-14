import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { tokenModel } from '../models/tokenModel';
import { viewAllBookingsModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-unapproved-bookings',
  standalone: true,
  imports: [RouterModule,CommonModule,ToastrModule],
  templateUrl: './unapproved-bookings.component.html',
  styleUrl: './unapproved-bookings.component.css'
})
export class UnapprovedBookingsComponent {
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
    this.gharSewaService.getUnapprovedBookings().subscribe({
      next: (data: viewAllBookingsModel[]) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }

  onApprove(id:number){
    this.gharSewaService.approveBookings(id).subscribe({
      next:(response)=>{
        this.toastr.success(response.message);
        this.loadBookings();
      }
    })
  }
}


