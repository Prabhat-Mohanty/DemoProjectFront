import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
// import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  books: any;
  searchResultCount: number = 0;
  // imgurl: string = environment.imgUrl;
  imgurl: string = 'https://localhost:7085/img/';
  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}
  authorList: any;
  publisherList: any;
  arrayOfString: string[] = [];
  ngOnInit(): void {
    this.adminService.getAllAuthors().subscribe(
      (res) => {
        this.authorList = res;
      },
      (error) => {
        console.log(error.error);
      }
    );

    this.adminService.getAllPublisher().subscribe(
      (res) => {
        this.publisherList = res;
      },
      (error) => {
        console.log(error.error);
      }
    );

    this.adminService.getAllBooksWithFilters(this.filterObj).subscribe(
      (res) => {
        this.books = res;
      },
      (error) => {
        console.log(error.error);
      }
    );

    this.adminService.getAllBooks().subscribe(
      (res) => {
        this.searchResultCount = Object.keys(res).length;
        this.arrayOfString = Object.keys(res);

        for (let index = 0; index < this.arrayOfString.length; index++) {
          this.arrayOfNumber.push(
            Math.floor(
              Number(this.arrayOfString[index]) / this.filterObj.pageSize
            )
          );
        }
        this.Index = Array.from(new Set(this.arrayOfNumber));
        // console.log(this.Index);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  arrayOfNumber: number[] = [];

  Index: number[] = [];
  genres: string[] = [
    'arts',
    'autobio',
    'bengali',
    'classics',
    'comics',
    'cookery',
    'geopolitics',
    'gujarati',
    'health',
    'hindi',
    'history',
    'india',
    'kannada',
    'knowledge',
    'management',
    'marketing',
    'music',
    'romance',
    'science',
    'tamil',
    'technical',
    'teens',
    'telugu',
    'toddler',
    'trade',
    'travel',
    'urdu',
  ];

  bookForm = new FormGroup({
    BookName: new FormControl(''),
    Genre: new FormControl(''),
    NumberOfPages: new FormControl(''),
    ActualStocks: new FormControl(''),
    AuthorIds: new FormControl([]),
    Ratings: new FormControl(''),
    BookCost: new FormControl(''),
    PublisherId: new FormControl(''),
    Language: new FormControl(''),
    Description: new FormControl(''),
    PublishDate: new FormControl(''),
    Edition: new FormControl(''),
    Images: new FormControl(''),
  });
  selectedFiles: File[] = [];
  onChange(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  addBook() {
    const postData: any = this.bookForm.value;
    const formData = new FormData();
    formData.append('BookName', postData.BookName);
    formData.append('Genre', postData.Genre);
    formData.append('NumberOfPages', postData.NumberOfPages);
    formData.append('ActualStocks', postData.ActualStocks);
    formData.append('Ratings', postData.Ratings);
    formData.append('BookCost', postData.BookCost);
    formData.append('PublisherId', postData.PublisherId);
    formData.append('Language', postData.Language);
    formData.append('Description', postData.Description);
    formData.append('PublishDate', postData.PublishDate);
    formData.append('Edition', postData.Edition);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('Images', this.selectedFiles[i]);
    }

    if (this.bookForm.value.AuthorIds != null) {
      for (let i = 0; i < this.bookForm.value.AuthorIds.length; i++) {
        formData.append('AuthorIds', this.bookForm.value.AuthorIds[i]);
      }
    }

    // console.log(postData.AuthorIds);
    // console.log(postData); // see
    // console.log(formData); // send

    this.adminService.addBook(formData).subscribe(
      (res) => {
        this.toast.success('Book Added Successfully');
        this.onClick();
        console.log(res);
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  filterObj = {
    bookname: '',
    pageNumber: 1,
    pageSize: 5,
  };

  decrement() {
    this.filterObj.pageNumber--;
    this.onClick();
  }
  increment() {
    this.filterObj.pageNumber++;
    this.onClick();
  }

  onClick() {
    console.log(this.filterObj);
    this.adminService.getAllBooksWithFilters(this.filterObj).subscribe(
      (res) => {
        this.books = res;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  bookId: number = 0;
  edit(id: number) {
    this.bookId = id;

    this.adminService.editBook(id).subscribe(
      (res: any) => {
        this.bookForm = new FormGroup({
          BookName: new FormControl(res['bookName']),
          Genre: new FormControl(res['genre']),
          NumberOfPages: new FormControl(res['numberOfPages']),
          ActualStocks: new FormControl(res['actualStocks']),
          AuthorIds: new FormControl(res['authorIds']),
          Ratings: new FormControl(res['ratings']),
          BookCost: new FormControl(res['bookCost']),
          PublisherId: new FormControl(res['publisherId']),
          Language: new FormControl(res['language']),
          Description: new FormControl(res['description']),
          PublishDate: new FormControl(res['publishDate'].split('T')[0]),
          Edition: new FormControl(res['edition']),
          Images: new FormControl(res['images']),
        });

        console.log(this.bookForm.value);
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }
  updateBook() {
    const postData: any = this.bookForm.value;
    const formData = new FormData();
    formData.append('BookName', postData.BookName);
    formData.append('Genre', postData.Genre);
    formData.append('NumberOfPages', postData.NumberOfPages);
    formData.append('ActualStocks', postData.ActualStocks);
    formData.append('Ratings', postData.Ratings);
    formData.append('BookCost', postData.BookCost);
    formData.append('PublisherId', postData.PublisherId);
    formData.append('Language', postData.Language);
    formData.append('Description', postData.Description);
    formData.append('PublishDate', postData.PublishDate);
    formData.append('Edition', postData.Edition);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('Images', this.selectedFiles[i]);
    }

    if (this.bookForm.value.AuthorIds != null) {
      for (let i = 0; i < this.bookForm.value.AuthorIds.length; i++) {
        formData.append('AuthorIds', this.bookForm.value.AuthorIds[i]);
      }
    }

    this.adminService.updateBook(this.bookId, formData).subscribe(
      (res) => {
        this.toast.success('Book Updated Successfully');
        this.onClick();
        console.log(res);
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
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
        this.adminService.deleteBook(id).subscribe(
          (res) => {
            this.toast.success('Book has been deleted.');
          },
          (error) => {
            this.toast.error(error.error);
          }
        );
      }
    });
  }
}
