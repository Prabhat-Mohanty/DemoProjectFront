import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent {
  contactForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Subject: new FormControl(''),
    Message: new FormControl(''),
  });
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
