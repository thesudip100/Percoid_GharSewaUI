import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tokenModel } from '../models/tokenModel';
import { editProfileModel } from '../models/userLoginModel';
import { GharSewaService } from '../services/ghar-sewa.service';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
    model:editProfileModel;
    user: tokenModel | null = null;

    constructor(private gharSewaService:GharSewaService){
      this.model={
        userName:'',
        fullName:'',
        address:'',
        email:'',
        phone:''
      }
      this.onload();
    }

    

    onload(): void {
      this.user = this.gharSewaService.getUserInfo();
      if(this.user.userId)
      {
      this.gharSewaService.getUserbyId(this.user?.userId).subscribe({
        next:(data:editProfileModel)=>{
          this.model=data;
          console.log(this.model,data)
        }
      })}
    }

    onSubmit(id:number|undefined)
    {
      if(id!==undefined)
      {
      this.gharSewaService.editProfile(this.model,id).subscribe({
        next:(response:any)=>{
          alert(response.message)
        }
      })
    }
  }

}
