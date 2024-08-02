import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { addServicesModel, bookserviceModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.css'
})
export class BookServiceComponent {
  model: bookserviceModel;
  categories: addServicesModel[] = [];
  minDateTime: string = new Date().toISOString();

  constructor(private gharsewaservice: GharSewaService, private toastr:ToastrService, private router:Router) {
    this.model = {
      serviceName: "",
      bookingDate: ""
    }
    this.onload();
  }
  onload() {
    this.gharsewaservice.getallcategory().subscribe({
      next: (data: addServicesModel[]) => {
        this.categories = data;
      }
    });
  }

  onSubmit() {
    const confirmation = window.confirm('Do you want to book this service?');
    if (confirmation) {
      this.gharsewaservice.bookService(this.model).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.router.navigate(['user/dashboard/view-booking']);
        }
      })
    }
  }
}
