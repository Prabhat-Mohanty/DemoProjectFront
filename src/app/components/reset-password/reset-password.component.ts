import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  cpassword: string | null | undefined = '';
  password: string | null | undefined = '';
  email: string = '';
  token: string = '';
  ngOnInit() {}

  resetform = new FormGroup({
    Password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
  });

  get ConfirmPassword() {
    this.cpassword = this.resetform.value.ConfirmPassword;
    return this.resetform.get('ConfirmPassword');
  }
  get Password() {
    this.password = this.resetform.value.Password;
    return this.resetform.get('Password');
  }

  resetpassword() {
    this.spinner.show();
    if (
      this.resetform.value.Password !== this.resetform.value.ConfirmPassword
    ) {
      this.resetform.setErrors({ mismatch: true });
      return;
    }
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];
    });
    this.auth
      .resetPassword(this.password, this.cpassword, this.email, this.token)
      .subscribe(
        (res: any) => {
          this.toast.success(res.message, res.status);
          this.spinner.hide();
          this.router.navigate(['/login']);
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
