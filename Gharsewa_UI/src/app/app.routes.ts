import { Routes } from '@angular/router';
import { AddFeedbackComponent } from './features/category/add-feedback/add-feedback.component';
import { AddServicesComponent } from './features/category/add-services/add-services.component';
import { AdminDashboardComponent } from './features/category/admin-dashboard/admin-dashboard.component';
import { BookServiceComponent } from './features/category/book-service/book-service.component';
import { BookingViewComponent } from './features/category/booking-view/booking-view.component';
import { ChangePasswordComponent } from './features/category/change-password/change-password.component';
import { DashboardComponent } from './features/category/dashboard/dashboard.component';
import { EditProfileComponent } from './features/category/edit-profile/edit-profile.component';
import { LoginuserComponent } from './features/category/loginuser/loginuser.component';
import { RegisterUserComponent } from './features/category/register-user/register-user.component';
import { UnapprovedBookingsComponent } from './features/category/unapproved-bookings/unapproved-bookings.component';
import { UpdateBookingComponent } from './features/category/update-booking/update-booking.component';
import { ViewAllBookingsComponent } from './features/category/view-all-bookings/view-all-bookings.component';
import { ViewFeedbacksComponent } from './features/category/view-feedbacks/view-feedbacks.component';
import { ViewProfileComponent } from './features/category/view-profile/view-profile.component';


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
        },

        {
          path: 'change-password',
          component: ChangePasswordComponent
        },

        {
          path: 'all-bookings',
          component: ViewAllBookingsComponent
        },
        {
          path: 'add-feedbacks',
          component: AddFeedbackComponent
        },

        {
          path: 'view-feedbacks',
          component: ViewFeedbacksComponent
        },

        {
          path: 'add-services',
          component: AddServicesComponent
        },

        
        {
          path: 'view-profile',
          component: ViewProfileComponent
        },
        {
          path:'update-booking/:bookingId',
          component:UpdateBookingComponent
        }, 
        {
          path:'unapproved-bookings',
          component:UnapprovedBookingsComponent
        }, 
        {
          path:'',
          component:AdminDashboardComponent
        }

      ]
    }
  ];
  
