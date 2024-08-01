import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { feedbackModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';


@Component({
  selector: 'app-view-feedbacks',
  standalone: true,
  imports: [CommonModule,ToastrModule],
  templateUrl: './view-feedbacks.component.html',
  styleUrl: './view-feedbacks.component.css'
})
export class ViewFeedbacksComponent {
  feedbacks: feedbackModel[] = [];

  constructor(private gharSewaService: GharSewaService, private router: Router, private toastr:ToastrService) {
    this.onload();
  }

  onload(): void {
      this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.gharSewaService.getAllFeedbacks().subscribe({
      next: (data: feedbackModel[]) => {
        this.feedbacks = data;
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
      }
    });
  }

  Delete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this feedback?');
    if (confirmation) {
      this.gharSewaService.deleteFeedback(id).subscribe({
        next:(response)=>{   
         this.toastr.success(response.message);
         this.loadFeedbacks();
        }
      });
    }
  }
}
