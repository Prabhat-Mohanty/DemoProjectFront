import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // baseUrl: string = environment.adminController;
  baseUrl: string = 'https://localhost:7085/api/AdminBook';

  // userUrl: string = environment.userController;
  userUrl: string = 'https://localhost:7085/api/User';

  constructor(private http: HttpClient) {
    this.decodeToken();
  }

  getBooksByGenre(
    genres: string[],
    query: string,
    filterObj: any
  ): Observable<any> {
    if (query.length < 1) {
      return this.http.get(
        `${this.baseUrl}/category?genres=${genres.join(
          '&genres='
        )}&pageNumber=${filterObj.pageNumber}&pageSize=${filterObj.pageSize}`
      );
    }
    return this.http.get(
      `${this.baseUrl}/category?search=${query}&genres=${genres.join(
        '&genres='
      )}`
    );
  }

  token: any = localStorage.getItem('token');
  decode: any;
  decodeToken() {
    if (this.token) {
      this.decode = jwt_decode(this.token);
    }
  }

  email: any;
  role: any;
  getLoggedInUserEmail() {
    this.token = localStorage.getItem('token');
    this.decodeToken();
    const arr = Object.entries(this.decode).map(([key, value]) => ({
      [key]: value,
    }));
    this.email = Object.values(arr[0]).join(' ');
    return this.email;
  }

  getLoggedInUserRole() {
    const arr = Object.entries(this.decode).map(([key, value]) => ({
      [key]: value,
    }));
    this.role = Object.values(arr[2]).join(' ');
    return this.role;
  }

  applyForRent(bid: number | null, noOfdays: number | null) {
    const issueData = {
      userEmail: this.email,
      bookId: bid,
      days: noOfdays,
    };

    return this.http.post(this.userUrl, issueData);
  }

  getBookById(id: number) {
    return this.http.get(`${this.baseUrl}/GetBookById/${id}`);
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  getAllIssuedBooks(status: string[], search: string) {
    this.getLoggedInUserEmail();

    if (search.length > 0) {
      return this.http.get<any>(
        `${this.userUrl}/listOfOrders?email=${
          this.email
        }&search=${search}&status=${status.join('&status=')}`,
        this.httpOptions
      );
    }

    return this.http.get<any>(
      `${this.userUrl}/listOfOrders?email=${this.email}&status=${status.join(
        '&status='
      )}`,
      this.httpOptions
    );
  }
}
