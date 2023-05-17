import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent {
  contactForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[6-9]\\d{9}$'),
    ]),
    Subject: new FormControl('', [Validators.required]),
    Message: new FormControl('', [Validators.required]),
  });

  // Validation methods for all form fields
  get Name() {
    return this.contactForm.get('Name');
  }
  get Email() {
    return this.contactForm.get('Email');
  }
  get PhoneNumber() {
    return this.contactForm.get('PhoneNumber');
  }
  get Subject() {
    return this.contactForm.get('Subject');
  }
  get Message() {
    return this.contactForm.get('Subject');
  }

  constructor(
    private adminService: AdminService,
    private toast: ToastrService
  ) {}

  contactNow() {
    if (this.contactForm.value != null) {
      this.adminService.contactUs(this.contactForm.value).subscribe(
        (res) => this.toast.success('We will respond you ASAP.'),
        (error) => this.toast.error(error.error)
      );
    }
  }
}
