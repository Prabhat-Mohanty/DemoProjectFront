import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:7085/api/Authentication';

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
    // const url = `${this.baseUrl}/forget-password`;
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    const url = `${this.baseUrl}/user-reset-password`;
    const body = { oldpassword: oldPassword, newpassword: newPassword };
    return this.http.post(url, body, httpOptions);
  }

  //Check the user is logged in or not
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  //Get Token
  getoken(): string | null {
    return localStorage.getItem('token');
  }
}
