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
  constructor(private Book: BookService) {}
  ngOnInit(): void {
    this.Book.getAllIssuedBooks().subscribe(
      (res) => {
        this.issuedbook = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
