import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Author } from 'src/app/interface/author';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css'],
})
export class AddauthorComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllAuthor();
  }
  pageSize = 5; // number of items to display per page
  currentPage = 1; // current page number
  authors: any;
  authorForm = new FormGroup({
    authorName: new FormControl(''),
  });

  getAllAuthor() {
    // debugger;
    this.adminService.getAllAuthors().subscribe(
      (res) => {
        this.authors = res;
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  authorId: number = 0;
  edit(id: number) {
    console.log(id);
    this.authorId = id;
    this.adminService.editAuthor(id).subscribe(
      (res: any) => {
        this.authorForm.setValue({ authorName: res.authorName });
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  updateAuthor() {
    console.log(this.authorForm.value.authorName);
    if (this.authorForm.value.authorName) {
      this.adminService
        .updateAuthor(this.authorId, this.authorForm.value.authorName)
        .subscribe(
          (res) => {
            this.authors = [];
            this.authors = res;
            this.toast.success('Author added successfully');
          },
          (error) => {
            this.toast.error(error.error);
          }
        );
    }
  }

  delete(id: number) {
    this.adminService.deleteAuthor(id).subscribe(
      (res) => {
        this.authors = [];
        this.authors = res;
        this.toast.success('Author deleted successfully');
        this.getAllAuthor();
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }
  addAuthor() {
    this.adminService.addAuthor(this.authorForm.value).subscribe(
      (res) => {
        this.authors = [];
        this.authors = res;
        this.toast.success('Author added successfully');
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }
}