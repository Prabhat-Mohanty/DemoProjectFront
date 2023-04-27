import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import 'bootstrap';
import * as $ from 'jquery';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, AfterViewChecked {
  ProfilePicture: any;
  msgForProfile: string = '';
  res: any;
  genders: any;
  states: any;
  cities: any;

  ngAfterViewChecked(): void {
    $('[data-bs-toggle="tooltip"]').tooltip(); // to enable tooltips, with default configuration

    $('[data-bs-toggle="tooltip"]').tooltip({
      boundary: 'clippingParents',
      customClass: 'myClass',
    }); // to initialize tooltips with given configuration

    $('#myTooltip').tooltip('show'); // to trigger `show` method
  }
  constructor(
    public auth: AuthService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  date = new Date();
  maxDate: string = '';
  ngOnInit(): void {
    this.maxDate =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
    console.log(this.maxDate);

    this.genders = ['Male', 'Female'];
    this.states = [
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Telangana',
      'Tripura',
      'Uttarakhand',
      'Chandigarh',
      'Lakshadweep',
      'Delhi',
      'Puducherry',
      'Ladakh',
    ];
    this.cities = [
      'Ahmedabad',
      'Surat',
      'Vadodara',
      'Rajkot',
      'Bhavnagar',
      'Jamnagar',
      'Junagadh',
      'Gandhinagar',
      'Anand',
      'Nadiad',
    ];
  }

  onChange(event: any) {
    const ext = event.target.files[0].type.split('/')[1];
    const extArr = ['jpeg', 'jpg', 'png'];
    if (event.target.files[0].name.length > 0 && extArr.includes(ext)) {
      const file = event.target.files[0];
      this.ProfilePicture = file;
    } else {
      this.registerForm.setErrors({ invalidExtension: true });
    }
  }

  registerForm = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    MiddleName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    Gender: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[6-9]\\d{9}$'),
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    DOB: new FormControl('', [Validators.required]),
    State: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required),
    Pincode: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{6}/),
    ]),
    FullAddress: new FormControl('', Validators.required),
    Password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
    ProfilePicture: new FormControl('', [Validators.required]),
  });

  // Validation methods for all form fields
  get FirstName() {
    return this.registerForm.get('FirstName');
  }
  get MiddleName() {
    return this.registerForm.get('MiddleName');
  }
  get LastName() {
    return this.registerForm.get('LastName');
  }
  get Gender() {
    return this.registerForm.get('Gender');
  }
  get PhoneNumber() {
    return this.registerForm.get('PhoneNumber');
  }
  get Email() {
    return this.registerForm.get('Email');
  }
  get DOB() {
    return this.registerForm.get('DOB');
  }
  get State() {
    return this.registerForm.get('State');
  }
  get City() {
    return this.registerForm.get('City');
  }
  get Pincode() {
    return this.registerForm.get('Pincode');
  }
  get FullAddress() {
    return this.registerForm.get('FullAddress');
  }
  get Password() {
    return this.registerForm.get('Password');
  }
  get profilePicture() {
    return this.registerForm.get('ProfilePicture');
  }

  onRegister() {
    this.spinner.show();
    const postData: any = this.registerForm.value;
    const formData = new FormData();
    formData.append('FirstName', postData.FirstName);
    formData.append('MiddleName', postData.MiddleName);
    formData.append('LastName', postData.LastName);
    formData.append('Gender', postData.Gender);
    formData.append('PhoneNumber', postData.PhoneNumber);
    formData.append('Email', postData.Email);
    formData.append('DOB', postData.DOB);
    formData.append('State', postData.State);
    formData.append('City', postData.City);
    formData.append('Pincode', postData.Pincode);
    formData.append('FullAddress', postData.FullAddress);
    formData.append('Password', postData.Password);
    formData.append('ProfilePicture', this.ProfilePicture);
    // console.log(postData);
    this.auth.register(formData).subscribe(
      (res: any) => {
        if (res.status === 'Success') {
          this.toast.success(res.message);
          this.spinner.hide();
          this.router.navigate(['/signin']);
        } else {
          this.spinner.hide();
          this.router.navigate;
          this.router.navigate(['signin']);
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
