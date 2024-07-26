import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { userRegistrationModel } from '../models/userRegistrationModel';
import { GharSewaService } from '../services/ghar-sewa.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
      model: userRegistrationModel;


      constructor(private gharsewaservice:GharSewaService,private router:Router){
        this.model={
          FullName:'',
          UserName:'',
          Password:'',
          Address:'',
          Email:'',
          Phone:''
        }
      }

      onFormSubmit()
      {
        this.gharsewaservice.userRegister(this.model).subscribe({
          next:(response)=>{
            this.router.navigate(['']);           
            alert(response.message);
          }
        })
      }
}

