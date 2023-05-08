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

  // --------------------Author--------------------
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

  //Get Author By Id
  editAuthor(id: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(`${this.baseurl}/getauthorbyid/${id}`, { headers });
  }

  //Update Author
  updateAuthor(id: number, name: string) {
    const apiUrl = `https://localhost:7085/api/AdminBook/updateAuthor/${id}`;
    const body = `"${name}"`;
    const headers = {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*',
    };

    return this.http.put(apiUrl, body, { headers });
  }

  //delete author
  deleteAuthor(id: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.delete(`${this.baseurl}/deleteAuthor/${id}`);
  }

  // --------------------Publisher--------------------

  //Get All Publisher
  getAllPublisher() {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(`${this.baseurl}/getAllPublisher`, {
      headers,
    });
  }

  //Add publisher
  addPublisher(publisherName: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        accept: '*/*',
      }),
    };
    return this.http.post(
      `${this.baseurl}/addPublisher`,
      publisherName,
      httpOptions
    );
  }

  // Get Publisher By Id
  editPublisher(id: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(`${this.baseurl}/getpublisherbyid/${id}`, { headers });
  }

  //Update Publisher
  updatePublisher(id: number, name: string) {
    const apiUrl = `https://localhost:7085/api/AdminBook/updatePublisher/${id}`;
    const body = `"${name}"`;
    const headers = {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*',
    };

    return this.http.put(apiUrl, body, { headers });
  }

  //delete publisher
  deletePublisher(id: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.delete(`${this.baseurl}/deletePublisher/${id}`);
  }
}
