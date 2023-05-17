import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  contactDetails: any;

  filterObj = {
    searchTerm: '',
    pageSize: 5,
    pageNumber: 1,
  };

  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.getContactDetails();
  }

  onClick() {
    this.getContactDetails();
  }

  increment() {
    this.filterObj.pageNumber++;
    this.getContactDetails();
  }

  decrement() {
    this.filterObj.pageNumber--;
    this.getContactDetails();
  }
  pageSizeFunc($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.filterObj.pageSize = Number(target.value);
    this.getContactDetails();
  }

  getContactDetails() {
    this.adminService
      .getContactDetails(
        this.filterObj.searchTerm,
        this.filterObj.pageSize,
        this.filterObj.pageNumber
      )
      .subscribe((res) => {
        this.contactDetails = res;
      });
  }
}
