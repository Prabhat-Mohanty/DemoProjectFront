import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-getall-request',
  templateUrl: './getall-request.component.html',
  styleUrls: ['./getall-request.component.css'],
})
export class GetallRequestComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {}

  pendingRequests: any;

  status = ['Pending', 'Approved', 'Delivered', 'Completed'];

  filterObj = {
    pageNumber: 1,
    pageSize: 5,
  };

  changeStatus(value: string, reqid: number, days: number, email: string) {
    this.spinner.show();
    this.adminService.changeStatus(value, reqid, days, email).subscribe(
      (res) => {
        this.callAPI();
        this.spinner.hide();
      },
      (error) => {
        this.callAPI();
        console.log(error.error);
        this.spinner.hide();
      }
    );
  }

  updateStatusArray(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
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

  selectedValue: string = '';
  statusFromRoute: string = '';
  ngOnInit(): void {
    this.statusFromRoute = this.activatedRoute.snapshot.params['status'];
    this.selectedValue = this.statusFromRoute;
    if (this.statusFromRoute != undefined) {
      this.status.length = 0;
      this.status.push(this.statusFromRoute);
      this.callAPI();
    } else {
      this.callAPI();
    }
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
        },
        (error) => {
          this.toast.error(error.error);
        }
      );
  }
  issuedbook: any;
}
