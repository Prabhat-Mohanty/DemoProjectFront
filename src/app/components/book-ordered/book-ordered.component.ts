import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { map } from 'rxjs';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-ordered',
  templateUrl: './book-ordered.component.html',
  styleUrls: ['./book-ordered.component.css'],
})
export class BookOrderedComponent implements OnInit {
  issuedbook: any;
  status = ['pending', 'approved', 'completed', 'due', 'rejected'];
  pageSize = 5; // number of items to display per page
  currentPage = 1; // current page number

  constructor(private Book: BookService) {}
  ngOnInit(): void {
    debugger;
    this.Book.getAllIssuedBooks(this.status).subscribe(
      (res) => {
        this.issuedbook = res;
        console.log(this.issuedbook);
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
