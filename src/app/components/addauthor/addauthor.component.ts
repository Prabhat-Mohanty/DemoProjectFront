import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css'],
})
export class AddauthorComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllAuthor();
  }
  pageSize = 10;
  currentPage = 1;
  searchResultCount: number = 0;
  authors: any;
  authorForm = new FormGroup({
    authorName: new FormControl('', [Validators.required]),
  });

  get authorName() {
    return this.authorForm.get('authorName');
  }

  getAllAuthor() {
   
    this.adminService.getAllAuthors().subscribe(
      (res) => {
        this.authors = res;
        this.searchResultCount = Object.keys(res).length;
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  authorId: number = 0;
  edit(id: number) {
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
            this.toast.success('Author updated successfully');
          },
          (error) => {
            this.toast.error(error.error);
          }
        );
    }
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this book?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
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
    });
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
