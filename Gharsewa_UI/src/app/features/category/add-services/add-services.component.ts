import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { addServicesModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-add-services',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './add-services.component.html',
  styleUrl: './add-services.component.css'
})
export class AddServicesComponent {
  model: addServicesModel;

  constructor(private service: GharSewaService, private toastr: ToastrService, private router:Router,private cdr: ChangeDetectorRef) {
    this.model = {
      categoryname: "",
    }
  }

  onSubmit(form: any) {
    const confirmation = window.confirm("Do you want to add this service?");
    if (confirmation) {
      this.service.addService(this.model).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          setTimeout(() => {
            form.resetForm();
          }, 0);
        }
      });
    }
  }
  
}
