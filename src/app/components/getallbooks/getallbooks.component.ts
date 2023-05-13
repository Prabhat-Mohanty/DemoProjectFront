import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-getallbooks',
  templateUrl: './getallbooks.component.html',
  styleUrls: ['./getallbooks.component.css'],
})
export class GetallbooksComponent implements OnInit {
  // imgurl: string = environment.imgUrl;
  imgurl: string = 'https://localhost:7085/img/';

  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.getAllBook();
  }

  pageSize = 5; // number of items to display per page
  currentPage = 1; // current page number
  books: any;

  getAllBook() {
    this.adminService.getAllBooks().subscribe(
      (res) => {
        this.books = res;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
