import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  isVisible: boolean = false;
  constructor(
    public auth: AuthService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {
    this.auth.isVisible.subscribe((res) => {
      this.isVisible = res;
    });
  }
  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });

  get Email() {
    return this.loginForm.get('Email');
  }
  get Password() {
    return this.loginForm.get('Password');
  }

  token: any;
  decode: any;
  role: any;
  email: any;

  checkLoggedInRole() {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.decode = jwt_decode(this.token);
      const arr = Object.entries(this.decode).map(([key, value]) => ({
        [key]: value,
      }));
      this.role = Object.values(arr[2]).join(' ');
      return this.role;
    }
  }

  onLogin() {
    this.spinner.show();
    // console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.token != null) {
          localStorage.setItem('token', res.token);
          this.checkLoggedInRole();
          this.toast.success('Login Successfull', 'Success');
          this.spinner.hide();
          this.auth.isLogged.next(true);
          this.auth.isAdmin.next(this.checkLoggedInRole());
          localStorage.removeItem('role');
          localStorage.setItem('role', this.checkLoggedInRole());
          this.dialog.closeAll();
          this.router.navigate(['']);
        }
      },
      (error: any) => {
        if (error.error.message != null) {
          this.toast.error(error.error.message);
          this.spinner.hide();
        } else {
          this.toast.error(
            'Server is not responding, Please try again after some time.'
          );
          this.spinner.hide();
        }
      }
    );
  }
}
