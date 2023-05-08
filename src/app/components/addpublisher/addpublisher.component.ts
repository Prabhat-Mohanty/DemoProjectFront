import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-addpublisher',
  templateUrl: './addpublisher.component.html',
  styleUrls: ['./addpublisher.component.css'],
})
export class AddpublisherComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllPublisher();
  }

  getAllPublisher() {
    // debugger;
    this.adminService.getAllPublisher().subscribe(
      (res) => {
        this.publishers = res;
        this.searchResultCount = Object.keys(res).length;
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  pageSize = 10;
  currentPage = 1;
  searchResultCount: number = 0;
  publishers: any;

  publisherForm = new FormGroup({
    publisherName: new FormControl(''),
  });

  addPublisher() {
    this.adminService.addPublisher(this.publisherForm.value).subscribe(
      (res) => {
        this.publishers = [];
        this.publishers = res;
        this.toast.success('Author added successfully');
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  publisherId: number = 0;
  edit(id: number) {
    this.publisherId = id;
    this.adminService.editPublisher(id).subscribe(
      (res: any) => {
        this.publisherForm.setValue({ publisherName: res.publisherName });
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  updatePublisher() {
    if (this.publisherForm.value.publisherName) {
      this.adminService
        .updatePublisher(
          this.publisherId,
          this.publisherForm.value.publisherName
        )
        .subscribe(
          (res) => {
            this.publishers = [];
            this.publishers = res;
            this.toast.success('Publisher updated successfully');
          },
          (error) => {
            this.toast.error(error.error);
          }
        );
    }
  }

  delete(id: number) {
    this.adminService.deletePublisher(id).subscribe(
      (res) => {
        this.publishers = [];
        this.publishers = res;
        this.toast.success('Author deleted successfully');
        this.getAllPublisher();
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }
}
