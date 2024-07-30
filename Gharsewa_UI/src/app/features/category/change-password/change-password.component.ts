import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tokenModel } from '../models/tokenModel';
import { changePasswordModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  model:changePasswordModel;
  user: tokenModel | null = null;

  constructor(private gharSewaService:GharSewaService, private route:Router){
    this.model={
      oldpassword:"",
      newpassword:""
    }
    this.onload();
  }

  

  onload(): void {
    this.user = this.gharSewaService.getUserInfo();

  }

  onSubmit()
    {
      const id= this.user.userId;
      if(id!==undefined)
      {
      this.gharSewaService.changePassword(this.model,id).subscribe({
        next:(response:any)=>{
          alert(response.message)
        }
      })
      this.gharSewaService.deleteToken();
      this.route.navigate(['']);
    }
  }

}
