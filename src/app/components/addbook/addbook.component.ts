import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  books: any;
  pageSize = 10;
  currentPage = 1;
  searchResultCount: number = 0;
  constructor(
    private adminService: AdminService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  bookForm = new FormGroup({
    BookName: new FormControl(''),
    Genre: new FormControl(''),
    PublisherId: new FormControl(''),
    PublishDate: new FormControl(''),
    Language: new FormControl(''),
    Edition: new FormControl(''),
    BookCost: new FormControl(''),
    NumberOfPages: new FormControl(''),
    Description: new FormControl(''),
    ActualStocks: new FormControl(''),
    Ratings: new FormControl(''),
    AuthorIds: new FormControl(''),
    Images: new FormControl(''),
  });

  addBook() {}

  edit(id: number) {}
  updateBook() {}
  delete(id: number) {}
}
