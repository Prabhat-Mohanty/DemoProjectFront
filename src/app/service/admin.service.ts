import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  baseurl = 'https://localhost:7085/api/AdminBook';

  // Get all books
  getAllBooks() {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(`${this.baseurl}/getAllBooksWithAuthorId`, {
      headers,
    });
  }

  // Get all authors
  getAllAuthors() {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(`${this.baseurl}/getAllAuthor`, {
      headers,
    });
  }

  //Add author
  addAuthor(authorName: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        accept: '*/*',
      }),
    };
    return this.http.post(`${this.baseurl}/addAuthor`, authorName, httpOptions);
  }

  //delete author
  deleteAuthor(id: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.delete(`${this.baseurl}/deleteAuthor/${id}`);
  }

  updateAuthor(id: number, name: string) {
    const apiUrl = `https://localhost:7085/api/AdminBook/updateAuthor/${id}`;
    const body = `"${name}"`;
    const headers = {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*',
    };

    return this.http.put(apiUrl, body, { headers });
  }

  editAuthor(id: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(`${this.baseurl}/getauthorbyid/${id}`, { headers });
  }
}
