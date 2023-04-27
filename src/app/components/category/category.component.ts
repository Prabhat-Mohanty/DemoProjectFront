import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { event } from 'jquery';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  books: any;
  imageSrc = '/bookImages/B1/10minutes.jpg';
  isChecked = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private book: BookService
  ) {}
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
  genre: string = '';

  ngOnInit() {
    this.genre = this.activatedRoute.snapshot.params['genre'];
  }
  onlo($event: any) {
   
    var genres: string[] = [];
    const id = $event.target.value;
    const check = $event.target.checked;

    genres = this.slidesStore.map((d: any) => {
      if (d.genre == id) {
        d.select = check;
        return d;
      }
      return d;
    });

    var s: string[] = [];
    genres = genres.map((d: any) => {
      if (d.select == true) {
        s.push(d.genre);
        return d.genre;
      } else {
        return '';
      }
    });
    this.book.getBooksByGenre(s).subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
