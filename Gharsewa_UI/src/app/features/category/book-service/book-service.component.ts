import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { bookserviceModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.css'
})
export class BookServiceComponent {
 model:bookserviceModel

 constructor(private gharsewaservice:GharSewaService){
   this.model={
     serviceName:"",
     bookingDate:""
   }
 }

 onSubmit()
 {
   this.gharsewaservice.bookService(this.model).subscribe({
     next:(response)=>{   
       alert(response.message);
     }
   })
 }
}
