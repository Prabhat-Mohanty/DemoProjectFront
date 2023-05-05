import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  bid: number = 0;
  book: any;
  suggestedBooks: any;
  checkAval = true;
  days = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private Book: BookService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bid = this.activatedRoute.snapshot.params['bid'];
    this.Book.getBookById(this.bid).subscribe(
      (res) => {
        this.book = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.Book.getLoggedInUserEmail();
  }

  onSubmit(data: any) {
    this.spinner.show();
    this.Book.applyForRent(data.BookId, this.days).subscribe(
      (res) => {
        this.spinner.hide();
        this.toast.success(
          `Your request for ${this.book.bookName} is sent to admin.`,
          'Sucsess'
        );
        this.router.navigate(['bookOrdered']);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  increment() {
    // console.log(this.book.actualStocks);
    if (this.book.actualStocks > 0)
      if (this.days < 20) {
        this.days++;
      }
  }

  decrement() {
    if (this.days > 0) {
      this.days--;
    }
  }

  checkStock() {
    this.checkAval = !this.checkAval;
  }
}
