import { Component } from '@angular/core';
import { tokenModel } from '../models/tokenModel';
import { editProfileModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  model: editProfileModel;
  user: tokenModel | null = null;

  constructor(private gharSewaService: GharSewaService) {
    this.model = {
      userName: '',
      fullName: '',
      address: '',
      email: '',
      phone: ''
    }
    this.onload();
  }



  onload(): void {
    this.user = this.gharSewaService.getUserInfo();
    if (this.user.userId) {
      this.gharSewaService.getUserbyId(this.user?.userId).subscribe({
        next: (data: editProfileModel) => {
          this.model = data;
        }
      })
    }
  }
}
