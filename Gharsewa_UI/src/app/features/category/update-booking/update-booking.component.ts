import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { allowedNodeEnvironmentFlags } from 'process';
import { addServicesModel, viewAllBookingsModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-update-booking',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-booking.component.html',
  styleUrl: './update-booking.component.css'
})
export class UpdateBookingComponent {
  model:viewAllBookingsModel;
  categories:addServicesModel[]=[];
  bookingId: number;
  minDateTime: string = new Date().toISOString();


  constructor(private gharSewaService:GharSewaService, private route: ActivatedRoute)
  {
    this.model={
      fullName:'',
      address: '',
      phone: '',
      serviceName: '',
      bookingDate: '',
      bookingId:NaN,
      bookingApproval:false
    }
    this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.onload()
  }

  onload()
  {
    this.gharSewaService.getallcategory().subscribe({
      next:(data:addServicesModel[])=>{
        this.categories=data;
      }
    });
  }
  onSubmit()
  {
    this.gharSewaService.updateBookings(this.model, this.bookingId).subscribe({
      next:(response)=>{
        alert(response.message)
      }
    })
  }
}
