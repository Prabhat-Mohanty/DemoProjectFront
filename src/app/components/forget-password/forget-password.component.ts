import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(
    public auth: AuthService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  email: string | null | undefined = '';

  forgetform = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
  });

  get Email() {
    this.email = this.forgetform.value.Email;
    return this.forgetform.get('Email');
  }

  forgetpassword() {
    this.spinner.show();

    this.auth.forgetPassword(this.email).subscribe(
      (res: any) => {
        this.toast.success(res.message, res.status);
        this.spinner.hide();
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
