import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  userDetails: any;
  ngOnInit(): void {
    this.adminService.getUserDetails().subscribe((res) => {
      this.userDetails = res;
    });
  }
}
