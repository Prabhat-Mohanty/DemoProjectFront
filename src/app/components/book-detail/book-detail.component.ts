import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
// import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  // imgurl: string = environment.imgUrl;
  imgurl: string = 'https://localhost:7085/img/';
  bid: number = 0;
  book: any;
  suggestedBooks: any;
  checkAval = true;
  days = 0;
  relatedBooks: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoWidth: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

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
        // console.log(this.book.genre.split(' '));
        this.callAPI(this.book.genre.split(' '));
      },
      (error) => {
        console.log(error);
      }
    );
    this.Book.getLoggedInUserEmail();
  }

  changeDetails(bid: number) {
    this.Book.getBookById(bid).subscribe(
      (res) => {
        this.book = res;
        this.callAPI(this.book.genre.split(' '));
        window.scrollTo(0, 0);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterObj = {
    bookname: '',
    pageNumber: 1,
    pageSize: 12,
  };

  callAPI(genre: string[]) {
    this.Book.getBooksByGenre(genre, '', this.filterObj).subscribe(
      (data: any) => {
        this.relatedBooks = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
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
        this.toast.error(error.error.message);
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
