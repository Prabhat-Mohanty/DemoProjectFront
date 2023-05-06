import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDetails } from 'src/app/model/user-details';
import { BookService } from 'src/app/service/book.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private auth: AuthService,
    private Book: BookService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {}
  userDetails!: UserDetails;
  counter = 0;

  updateuser = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    MiddleName: new FormControl(''),
    Gender: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Email: new FormControl(''),
    DOB: new FormControl(''),
    State: new FormControl(''),
    City: new FormControl(''),
    Pincode: new FormControl(''),
    FullAddress: new FormControl(''),
    ProfilePicture: new FormControl(''),
  });

  genders: string[] = ['Male', 'Female'];
  states = [
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
  cities = [
    'Ahmedabad',
    'Ankleshwar',
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
  date = new Date();
  maxDate: string = '';
  ProfilePicture: any;
  picToShow: any;
  ngAfterViewInit(): void {
    this.maxDate =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();

    this.auth.getUpdateProfile(this.Book.getLoggedInUserEmail()).subscribe(
      (res: any) => {
        this.userDetails = res;
        this.updateuser = new FormGroup({
          FirstName: new FormControl(res['firstName']),
          LastName: new FormControl(res['lastName']),
          MiddleName: new FormControl(res['middleName']),
          Gender: new FormControl(res['gender']),
          PhoneNumber: new FormControl(res['phoneNumber']),
          Email: new FormControl(res['email']),
          DOB: new FormControl(res['dob'].split('T')[0]),
          State: new FormControl(res['state']),
          City: new FormControl(res['city']),
          Pincode: new FormControl(res['pincode']),
          FullAddress: new FormControl(res['fullAddress']),
          ProfilePicture: new FormControl(
            'https://localhost:7085/img/' + res['profilePicture']
          ),
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  updateUser() {
    const postData: any = this.updateuser.value;
    const formData = new FormData();
    console.log('Picsss', this.ProfilePicture);
    formData.append('FirstName', postData.FirstName);
    formData.append('MiddleName', postData.MiddleName);
    formData.append('LastName', postData.LastName);
    formData.append('Gender', postData.Gender);
    formData.append('PhoneNumber', postData.PhoneNumber);
    formData.append('DOB', postData.DOB);
    formData.append('State', postData.State);
    formData.append('City', postData.City);
    formData.append('Pincode', postData.Pincode);
    formData.append('FullAddress', postData.FullAddress);
    formData.append('Email', postData.Email);
    formData.append('ProfilePicture', this.ProfilePicture);
    console.log(postData);
    this.auth.updateProfile(formData).subscribe(
      (res: any) => {
        if (res.status === 'Success') {
          this.toast.success(res.message);
          this.spinner.hide();
        } else {
          this.spinner.hide();
          console.log(
            'I m from line no. 143 of profile update of user ts file'
          );
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

  imageUrl: any;
  onChange(event: any) {
    this.counter++;
    const ext = event.target.files[0].type.split('/')[1];
    const extArr = ['jpeg', 'jpg', 'png'];
    if (event.target.files[0].name.length > 0 && extArr.includes(ext)) {
      const file = event.target.files[0];
      this.ProfilePicture = file;
      console.log(this.ProfilePicture);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }
}

// this.auth.getUpdateProfile(this.Book.getLoggedInUserEmail()).subscribe(
//   (res: any) => {
//     // console.log(res);
//     this.userDetails = res;
//     console.log(this.userDetails);
//   },
//   (error: any) => {
//     console.log(error);
//   }
// );
