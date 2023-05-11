import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-getall-request',
  templateUrl: './getall-request.component.html',
  styleUrls: ['./getall-request.component.css'],
})
export class GetallRequestComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toast: ToastrService
  ) {}

  pendingRequests: any;

  status = ['Pending', 'Approved', 'Delivered', 'Completed'];

  filterObj = {
    pageNumber: 1,
    pageSize: 5,
  };

  changeStatus(value: string, reqid: number, days: number) {
    this.adminService.changeStatus(value, reqid, days).subscribe(
      (res) => {
        this.callAPI();
      },
      (error) => {
        this.callAPI();
        console.log(error.error);
      }
    );
  }

  updateStatusArray(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    if (selectedValue.length > 0) {
      this.status = [];
      this.status.push(selectedValue);
      this.callAPI();
    } else {
      this.status = [];
      this.status.push('Pending');
      this.status.push('Approved');
      this.status.push('Delivered');
      this.status.push('Completed');
      this.callAPI();
    }
  }

  decrement() {
    this.filterObj.pageNumber--;
    this.callAPI();
  }
  increment() {
    this.filterObj.pageNumber++;
    this.callAPI();
  }

  ngOnInit(): void {
    this.callAPI();
  }

  callAPI() {
    this.adminService
      .getAllRequest(
        this.status,
        this.filterObj.pageNumber,
        this.filterObj.pageSize
      )
      .subscribe(
        (res) => {
          this.pendingRequests = res;
          // console.log(Object.keys(res).length);
        },
        (error) => {
          this.toast.error(error.error);
        }
      );
  }

  issuedbook: any;
}
