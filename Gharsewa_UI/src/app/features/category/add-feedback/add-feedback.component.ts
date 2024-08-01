import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tokenModel } from '../models/tokenModel';
import { feedbackModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-feedback.component.html',
  styleUrl: './add-feedback.component.css'
})
export class AddFeedbackComponent {
  model: feedbackModel;
  user: tokenModel | null = null;

  constructor(private gharsewaservice:GharSewaService){
    this.user = this.gharsewaservice.getUserInfo();
    if (this.user) {
      this.model = {
        id:NaN,
        userId:NaN,
        feedbackby: this.user.username,
        feedbackfor: "",
        message: ""
      };
    } else {
      // Handle the case when the user is not available
      this.model = {
        id:NaN,
        userId:NaN,
        feedbackby: "",
        feedbackfor: "",
        message: ""
      };
    }
  }   

  onSubmit()
 {
   this.gharsewaservice.addfeedback(this.model).subscribe({
     next:(response)=>{   
       alert(response.message);
     }
   })
 }
}
