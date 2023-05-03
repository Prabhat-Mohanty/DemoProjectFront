import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl: string = 'https://localhost:7085/api/AdminBook';
  userUrl: string = 'https://localhost:7085/api/User';

  constructor(private http: HttpClient) {
    this.decodeToken();
  }

  getBooksByGenre(genres: string[]): Observable<any> {
    debugger;
    return this.http.get(
      `${this.baseUrl}/category?genres=${genres.join('&genres=')}`
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
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json',
    });
    return this.http.post(this.userUrl, issueData, { headers });
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
  getAllIssuedBooks(status: string[]) {
    debugger;
    this.getLoggedInUserEmail();
    return this.http.get<any>(
      `${this.userUrl}/listOfOrders?email=${this.email}&status=${status.join(
        '&status='
      )}`,
      this.httpOptions
    );
  }
}
