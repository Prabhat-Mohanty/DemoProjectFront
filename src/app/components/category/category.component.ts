import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  imgurl: string = environment.imgUrl;

  books: any;
  imageSrc = '/bookImages/B1/10minutes.jpg';
  isChecked = false;

  issuedbook: any;

  @ViewChild('myinput') myinput: ElementRef<HTMLInputElement> =
    {} as ElementRef;

  slidesStore: any = [
    {
      genre: 'arts',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'arts',
      title: 'arts',
      select: false,
    },
    {
      genre: 'autobio',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'autobio',
      title: 'autobio',
      select: false,
    },
    {
      genre: 'bengali',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'bengali',
      title: 'bengali',
      select: false,
    },
    {
      genre: 'classics',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'classics',
      title: 'classics',
      select: false,
    },
    {
      genre: 'comics',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'comics',
      title: 'comics',
      select: false,
    },
    {
      genre: 'cookery',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'cookery',
      title: 'cookery',
      select: false,
    },
    {
      genre: 'geopolitics',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'geopolitics',
      title: 'geopolitics',
      select: false,
    },
    {
      genre: 'gujarati',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'gujarati',
      title: 'gujarati',
      select: false,
    },
    {
      genre: 'health',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'health',
      title: 'health',
      select: false,
    },
    {
      genre: 'hindi',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'hindi',
      title: 'hindi',
      select: false,
    },

    {
      genre: 'history',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'history',
      title: 'history',
      select: false,
    },
    {
      genre: 'india',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'india',
      title: 'india',
      select: false,
    },
    {
      genre: 'kannada',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'kannada',
      title: 'kannada',
      select: false,
    },
    {
      genre: 'knowledge',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'knowledge',
      title: 'knowledge',
      select: false,
    },
    {
      genre: 'management',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'management',
      title: 'management',
      select: false,
    },
    {
      genre: 'marketing',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'marketing',
      title: 'marketing',
      select: false,
    },
    {
      genre: 'music',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'music',
      title: 'music',
      select: false,
    },
    {
      genre: 'romance',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'romance',
      title: 'romance',
      select: false,
    },
    {
      genre: 'science',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'science',
      title: 'science',
      select: false,
    },
    {
      genre: 'tamil',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'tamil',
      title: 'tamil',
      select: false,
    },
    {
      genre: 'technical',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'technical',
      title: 'technical',
      select: false,
    },
    {
      genre: 'teens',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'teens',
      title: 'teens',
      select: false,
    },
    {
      genre: 'telugu',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'telugu',
      title: 'telugu',
      select: false,
    },
    {
      genre: 'toddler',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'toddler',
      title: 'toddler',
      select: false,
    },
    {
      genre: 'trade',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'trade',
      title: 'trade',
      select: false,
    },
    {
      genre: 'travel',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'travel',
      title: 'travel',
      select: false,
    },
    {
      genre: 'urdu',
      src: '../../../../assets/BookCover/b1.jpg',
      alt: 'urdu',
      title: 'urdu',
      select: false,
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private book: BookService
  ) {}

  searchTerm: any;
  ngAfterViewInit(): void {
    this.searchTerm = fromEvent<any>(this.myinput.nativeElement, 'keyup');
    const dataToSearch = fromEvent<any>(this.myinput.nativeElement, 'keyup');

    dataToSearch
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((data: any) => {
          // const sendval = this.getAllGenre() + data;
          return this.book.getBooksByGenre(
            this.getAllGenre(),
            data,
            this.filterObj
          );
        })
      )
      .subscribe(
        (res: any) => {
          this.books = res;
        },
        (error) => {
          console.log(error.error);
        }
      );
  }

  genre: string = '';
  ngOnInit(): void {
    this.genre = this.activatedRoute.snapshot.params['genre'];
    for (let index = 0; index < this.slidesStore.length; index++) {
      if (this.slidesStore[index].genre == this.genre) {
        this.slidesStore[index].select = true;
      }
    }

    this.callAPI(this.getAllGenre());
  }
  filterObj = {
    bookname: '',
    pageNumber: 1,
    pageSize: 12,
  };

  decrement() {
    const genre = [];
    this.filterObj.pageNumber--;
    for (let index = 0; index < this.slidesStore.length; index++) {
      if (this.slidesStore[index].select == true) {
        genre.push(this.slidesStore[index].genre);
      }
    }
    if (genre.length < 1) {
      const genres = [];
      for (let index = 0; index < this.slidesStore.length; index++) {
        if (this.slidesStore[index].select == false) {
          genres.push(this.slidesStore[index].genre);
        }
      }
      this.callAPI(genres);
    }

    this.callAPI(genre);
  }
  increment() {
    const genre = [];
    this.filterObj.pageNumber++;
    for (let index = 0; index < this.slidesStore.length; index++) {
      if (this.slidesStore[index].select == true) {
        genre.push(this.slidesStore[index].genre);
      }
    }

    if (genre.length < 1) {
      const genres = [];
      for (let index = 0; index < this.slidesStore.length; index++) {
        if (this.slidesStore[index].select == false) {
          genres.push(this.slidesStore[index].genre);
        }
      }
      this.callAPI(genres);
    }

    this.callAPI(genre);
  }

  callAPI(genre: string[]) {
    this.book.getBooksByGenre(genre, '', this.filterObj).subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listOfGenre: string[] = [];
  getAllGenre() {
    this.listOfGenre = [];
    for (let index = 0; index < this.slidesStore.length; index++) {
      if (this.slidesStore[index].select == true) {
        this.listOfGenre.push(this.slidesStore[index].genre);
      }
    }

    return this.listOfGenre;
  }

  onlo($event: any) {
    const id = $event.target.value;
    const check = $event.target.checked;
    for (let index = 0; index < this.slidesStore.length; index++) {
      if (this.slidesStore[index].genre == id) {
        this.slidesStore[index].select = check;
      }
    }

    const allBooks = [];
    if (this.getAllGenre().length == 0) {
      for (let index = 0; index < this.slidesStore.length; index++) {
        allBooks.push(this.slidesStore[index].genre);
      }
      this.callAPI(allBooks);
    } else {
      this.callAPI(this.getAllGenre());
    }
  }
}
