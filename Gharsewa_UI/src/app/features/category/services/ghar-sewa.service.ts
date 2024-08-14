import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { addServicesModel, bookserviceModel, changePasswordModel, editProfileModel, feedbackModel, userLoginModel, viewAllBookingsModel } from '../models/userLoginModel';
import { userRegistrationModel } from '../models/userRegistrationModel';
import { jwtDecode } from 'jwt-decode';
import { tokenModel } from '../models/tokenModel';



@Injectable({
  providedIn: 'root'
})

export class GharSewaService {

  constructor(private http: HttpClient) {

  }

  userRegister(model: userRegistrationModel): Observable<any> {
    return this.http.post<any>('https://localhost:7086/api/User/UserRegistration', model)
  }

  userLogin(model: userLoginModel): Observable<string> {
    return this.http.post<string>('https://localhost:7086/api/User/UserLogin', model)
  }

  bookService(model:bookserviceModel):Observable<any>{
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.post<any>('https://localhost:7086/api/Booking/BookService', model,{headers})
  }

  
  deleteAccount(id:number):Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get<any>(`https://localhost:7086/api/User/DeleteUser/${id}`,{headers})
  }

  getBookings(id:number):Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get<any>(`https://localhost:7086/api/Booking/GetBookingsbyUserId/${id}`,{headers})
  }

  getAllBookings():Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get<any>('https://localhost:7086/api/Booking/getAllBookings',{headers})
  }
  getUnapprovedBookings():Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get<any>('https://localhost:7086/api/Booking/GetUnapprovedBookings',{headers})
  }

  approveBookings(id:number):Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get<any>(`https://localhost:7086/api/Booking/ApproveBookings/${id}`,{headers})
  }

  editProfile(model:editProfileModel,id:number):Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.put<any>(`https://localhost:7086/api/User/EditUserProfile/${id}`,model,{headers})
  }

  changePassword(model:changePasswordModel,id:number):Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.put<any>(`https://localhost:7086/api/User/ChangePassword/${id}`,model,{headers})
  }

  getUserbyId(id:number):Observable<any>
  {
    return this.http.get<any>(`https://localhost:7086/api/User/GetSingleUser/${id}`)
  }

  deleteBooking(id:number):Observable<any>
  {
    return this.http.delete<any>(`https://localhost:7086/api/Booking/DeleteBookingDetails/${id}`)
  }

  addfeedback(model:feedbackModel):Observable<any>
  {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.post<any>('https://localhost:7086/api/Feedback/AddFeedbacks',model, {headers});
  }


  getAllFeedbacks():Observable<any>
  {
    return this.http.get<any>('https://localhost:7086/api/Feedback/GetAllFeedbacks')
  }

  deleteFeedback(id:number):Observable<any>
  {
    return this.http.delete<any>(`https://localhost:7086/api/Feedback/DeleteFeedbacks/${id}`)
  }

  addService(model:addServicesModel):Observable<any>
  {
    return this.http.post<any>('https://localhost:7086/api/Category/AddCategory',model);
  }

  getallcategory():Observable<addServicesModel[]>
  {
    return this.http.get<addServicesModel[]>('https://localhost:7086/api/Category/GetAllCategories');
  }

  updateBookings(model:viewAllBookingsModel,id:number):Observable<any>
  {
    return this.http.put<any>(`https://localhost:7086/api/Booking/UpdateBookingDetails/${id}`,model)
  }

  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('jwtToken', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): tokenModel | null{
    const token = this.getToken();
    if (token)
      {
        const decoded:any = jwtDecode(token);
        return{
          username:decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'], 
          userId: parseInt(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber'])
        };
      }
      return null;
  }

  isUser(): boolean {
    const userInfo = this.getUserInfo();
    if(userInfo?.role=="User")
      {
        return true
      }
    else{
      return false
    }
  }

  isAdmin(): boolean {
    const userInfo = this.getUserInfo();
    if(userInfo?.role=="Admin")
      {
        return true
      }
    else
    {
      return false
    }
  }

  deleteToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('jwtToken');
    }
  }

  logoutUser():void{
    this.deleteToken();
  }

}