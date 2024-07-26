import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { userLoginModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';



@Component({
  selector: 'app-loginuser',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.css'
})
export class LoginuserComponent {
  model: userLoginModel;

  constructor(private gharsewaservice:GharSewaService,private router:Router){
    this.model={
      UserName:'',
      PassWord:'',
    }
  }

  onFormSubmit()
      {
        this.gharsewaservice.userLogin(this.model).subscribe({
          next:(response: any)=>{
            if (response.message && this.isJwtToken(response.message)) {
              localStorage.setItem('jwtToken', response.message);
              this.router.navigate(['user/dashboard']);
            } 
            else 
            {
              alert(response.message)
            }
          }
        })
  
      }
  private isJwtToken(token: string) :boolean
  {
      const parts = token.split('.');
      if (parts.length !== 3)
      {
        return false;
      }
      return true;
  }
  
}
