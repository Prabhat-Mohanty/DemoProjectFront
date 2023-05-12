import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  pluck,
  switchMap,
} from 'rxjs';

import { BookService } from 'src/app/service/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-ordered',
  templateUrl: './book-ordered.component.html',
  styleUrls: ['./book-ordered.component.css'],
})
export class BookOrderedComponent implements OnInit, AfterViewInit {
  imgurl: string = environment.imgUrl;
  issuedbook: any;

  status = ['pending', 'approved', 'completed', 'due', 'rejected', 'delivered'];
  pageSize = 10; // number of items to display per page
  currentPage = 1; // current page number
  @ViewChild('myinput') myinput: ElementRef<HTMLInputElement> =
    {} as ElementRef;

  constructor(private Book: BookService) {}
  ngAfterViewInit(): void {
    const dataToSearch = fromEvent<any>(this.myinput.nativeElement, 'keyup');
    dataToSearch
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((data: any) => {
          // const sendval = this.getAllGenre() + data;
          return this.Book.getAllIssuedBooks(this.status, data);
        })
      )
      .subscribe(
        (res: any) => {
          this.issuedbook = res;
          this.searchResultCount = Object.keys(res).length;
        },
        (error) => {
          console.log(error.error);
        }
      );
  }

  searchResultCount: number = 0;
  ngOnInit(): void {
    this.Book.getAllIssuedBooks(this.status, '').subscribe(
      (res) => {
        this.issuedbook = res;
        this.searchResultCount = Object.keys(res).length;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
