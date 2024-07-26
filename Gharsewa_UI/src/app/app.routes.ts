import { Routes } from '@angular/router';
import { BookServiceComponent } from './features/category/book-service/book-service.component';
import { BookingViewComponent } from './features/category/booking-view/booking-view.component';
import { DashboardComponent } from './features/category/dashboard/dashboard.component';
import { EditProfileComponent } from './features/category/edit-profile/edit-profile.component';
import { LoginuserComponent } from './features/category/loginuser/loginuser.component';
import { RegisterUserComponent } from './features/category/register-user/register-user.component';


export const routes: Routes = [
    {
      path: 'user/register',
      component: RegisterUserComponent
    },
    {
      path: '',
      component: LoginuserComponent
    },
    {
      path: 'user/dashboard',
      component: DashboardComponent,
      children: [
        {
          path: 'book-service',
          component: BookServiceComponent
        },

        {
          path: 'view-booking',
          component: BookingViewComponent
        },

        {
          path: 'edit-profile',
          component: EditProfileComponent
        }

      ]
    }
  ];
  
