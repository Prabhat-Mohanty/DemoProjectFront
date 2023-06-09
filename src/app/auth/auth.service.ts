import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { BookService } from '../service/book.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isVisible = new Subject<boolean>();
  isLogged = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAdmin = new BehaviorSubject<any>(this.isAdminLoggedIn());
  checkLoggedInEmail = new BehaviorSubject<string>(this.getEmail());

  getEmail() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decode = jwt_decode(token);
      if (decode != null) {
        const arr = Object.entries(decode).map(([key, value]) => ({
          [key]: value,
        }));
        console.log(Object.values(arr[0]).join(' '));
        return Object.values(arr[0]).join(' ');
      }
    }
    return '';
  }

  constructor(private http: HttpClient, private bookService: BookService) {}
  baseUrl: string = environment.authenticateController;

  //For Register
  register(formData: any) {
    let userParam: HttpParams = new HttpParams().set('role', 'User');
    return this.http.post(this.baseUrl, formData, {
      params: userParam,
    });
  }

  //For Login
  login(data: any) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, data);
  }

  //Forget Password
  forgetPassword(email: string | null | undefined) {
    const url = `${this.baseUrl}/forget-password?email=${email}`;
    return this.http.post(url, null);
  }

  //Reset Password
  resetPassword(
    password: string | null | undefined,
    confirmPassword: string | null | undefined,
    email: string,
    token: string
  ) {
    const body = {
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      token: token,
    };
    const url = `${this.baseUrl}/reset-password`;
    return this.http.post(url, body);
  }

  // User Reset Password
  userResetPassword(
    oldPassword: string | null | undefined,
    newPassword: string | null | undefined,
    token: string | null | undefined
  ): Observable<any> {
    const url = `${this.baseUrl}/user-reset-password`;
    const body = { oldpassword: oldPassword, newpassword: newPassword };
    return this.http.post(url, body);
  }

  //Check the user is logged in or not
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
  //Check the user is logged in or not
  isAdminLoggedIn() {
    if (localStorage.getItem('role') !== null) {
      return localStorage.getItem('role');
    }
    return '';
  }

  //Get Token
  getoken(): string | null {
    return localStorage.getItem('token');
  }

  //Logout
  logout() {
    this.isAdmin.next('');
    return localStorage.removeItem('token');
  }

  etoken = localStorage.getItem('token');
  //Get Profile Details
  getUpdateProfile(email: string) {
    this.etoken = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/updateProfile?email=` + email);
  }

  //Update User Profile
  updateProfile(formData: FormData) {
    const url = `${this.baseUrl}/updateProfile`;
    return this.http.post(url, formData);
  }
}
