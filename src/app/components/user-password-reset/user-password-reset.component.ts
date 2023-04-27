import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.css'],
})
export class UserPasswordResetComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  oldpassword: string | null | undefined = '';
  newpassword: string | null | undefined = '';
  token: string | null | undefined = '';
  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

  passwordresetform = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
  });

  get oldPassword() {
    this.oldpassword = this.passwordresetform.value.oldPassword;
    return this.passwordresetform.get('oldPassword');
  }
  get newPassword() {
    this.newpassword = this.passwordresetform.value.newPassword;
    return this.passwordresetform.get('newPassword');
  }

  userresetpassword() {
    this.spinner.show();
    this.auth
      .userResetPassword(this.oldpassword, this.newpassword, this.token)
      .subscribe(
        (res: any) => {
          this.toast.success(res.message, res.status);
          this.spinner.hide();
          localStorage.removeItem('token');
          this.router.navigate(['/signin']);
        },
        (error: any) => {
          this.spinner.hide();
          if (error.error.message != null) {
            this.toast.error(error.error.message);
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.toast.error(
              'Server is not responding, Please try again after some time.'
            );
          }
        }
      );
  }
}
