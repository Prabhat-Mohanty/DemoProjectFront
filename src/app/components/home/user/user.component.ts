import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  ngOnInit(): void {}

  slidesStore: any = [
    {
      genre: 'arts',
      src: '../../../../assets/genreImage/arts.png',
      alt: 'arts',
      title: 'arts',
    },
    {
      genre: 'autobio',
      src: '../../../../assets/genreImage/autobio.png',
      alt: 'autobio',
      title: 'autobio',
    },
    {
      genre: 'bengali',
      src: '../../../../assets/genreImage/bengali.png',
      alt: 'bengali',
      title: 'bengali',
    },
    {
      genre: 'classics',
      src: '../../../../assets/genreImage/classics.png',
      alt: 'classics',
      title: 'classics',
    },
    {
      genre: 'comics',
      src: '../../../../assets/genreImage/comics.png',
      alt: 'comics',
      title: 'comics',
    },
    {
      genre: 'cookery',
      src: '../../../../assets/genreImage/cookery.png',
      alt: 'cookery',
      title: 'cookery',
    },
    {
      genre: 'geopolitics',
      src: '../../../../assets/genreImage/geopolitics.png',
      alt: 'geopolitics',
      title: 'geopolitics',
    },
    {
      genre: 'gujarati',
      src: '../../../../assets/genreImage/gujarati.png',
      alt: 'gujarati',
      title: 'gujarati',
    },
    {
      genre: 'health',
      src: '../../../../assets/genreImage/health.png',
      alt: 'health',
      title: 'health',
    },
    {
      genre: 'hindi',
      src: '../../../../assets/genreImage/hindi.png',
      alt: 'hindi',
      title: 'hindi',
    },

    {
      genre: 'history',
      src: '../../../../assets/genreImage/history.png',
      alt: 'history',
      title: 'history',
    },
    {
      genre: 'india',
      src: '../../../../assets/genreImage/india.png',
      alt: 'india',
      title: 'india',
    },
    {
      genre: 'kannada',
      src: '../../../../assets/genreImage/kannada.png',
      alt: 'kannada',
      title: 'kannada',
    },
    {
      genre: 'knowledge',
      src: '../../../../assets/genreImage/knowledge.png',
      alt: 'knowledge',
      title: 'knowledge',
    },
    {
      genre: 'management',
      src: '../../../../assets/genreImage/management.png',
      alt: 'management',
      title: 'management',
    },
    {
      genre: 'marketing',
      src: '../../../../assets/genreImage/marketing.png',
      alt: 'marketing',
      title: 'marketing',
    },
    {
      genre: 'music',
      src: '../../../../assets/genreImage/music.png',
      alt: 'music',
      title: 'music',
    },
    {
      genre: 'romance',
      src: '../../../../assets/genreImage/romance.png',
      alt: 'romance',
      title: 'romance',
    },
    {
      genre: 'science',
      src: '../../../../assets/genreImage/science.png',
      alt: 'science',
      title: 'science',
    },
    {
      genre: 'tamil',
      src: '../../../../assets/genreImage/tamil.png',
      alt: 'tamil',
      title: 'tamil',
    },
    {
      genre: 'technical',
      src: '../../../../assets/genreImage/technical.png',
      alt: 'technical',
      title: 'technical',
    },
    {
      genre: 'teens',
      src: '../../../../assets/genreImage/teens.png',
      alt: 'teens',
      title: 'teens',
    },
    {
      genre: 'telugu',
      src: '../../../../assets/genreImage/telugu.png',
      alt: 'telugu',
      title: 'telugu',
    },
    {
      genre: 'toddler',
      src: '../../../../assets/genreImage/toddler.png',
      alt: 'toddler',
      title: 'toddler',
    },
    {
      genre: 'trade',
      src: '../../../../assets/genreImage/trade.png',
      alt: 'trade',
      title: 'trade',
    },
    {
      genre: 'travel',
      src: '../../../../assets/genreImage/travel.png',
      alt: 'travel',
      title: 'travel',
    },
    {
      genre: 'urdu',
      src: '../../../../assets/genreImage/urdu.png',
      alt: 'urdu',
      title: 'urdu',
    },
  ];

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
}
