import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { tokenModel } from '../models/tokenModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user: tokenModel|null=null;
  constructor(public service:GharSewaService, private route:Router)
  {
      this.user=this.service.getUserInfo();
  }

  onLogout()
  {
    this.service.logoutUser();
    console.log("User successfully logged out.")
    this.route.navigate([''])
  }

  
  DeleteUser(id: number | undefined) {
    if (id !== undefined) {
      const confirmation = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
      if (confirmation) {
        this.service.deleteAccount(id).subscribe({
          next: (response) => {
            alert(response.message);
          }
        });
        this.service.deleteToken();
        this.route.navigate(['']);
      }
    } else {
      console.error('User ID is undefined. Cannot delete user.');
    }
  }
  
    
  
}
