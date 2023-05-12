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
  getAllBooksWithFilters(filter: {
    bookname: string;
    pageNumber: number;
    pageSize: number;
  }) {
    const headers = new HttpHeaders().set('accept', '*/*');
    const bookname = filter.bookname;
    const pageNumber = filter.pageNumber;
    const pageSize = filter.pageSize;
    return this.http.get(
      `${this.baseurl}/getAllBooksWithAuthorIdWithFilters?bookname=${bookname}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers,
      }
    );
  }

  addBook(formData: any) {
    return this.http.post(`${this.baseurl}/addbook`, formData);
  }

  editBook(id: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(`${this.baseurl}/GetBookByIds/${id}`, { headers });
  }

  updateBook(id: number, formData: any) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.put(`${this.baseurl}/updatebook/${id}`, formData, {
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

  // --------------------Issued Book Actions--------------------

  getAllRequest(status: string[], pageNumber: number, pageSize: number) {
    const headers = new HttpHeaders().set('accept', '*/*');
    return this.http.get(
      // `${this.baseurl}/getpendingrequest?status=${status.join(' ')}`,
      `${this.baseurl}/getpendingrequest?status=${status.join(
        '&status='
      )}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
  }

  changeStatus(value: string, reqid: number, days: number) {
    const headers = {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*',
    };
    if (value == 'Delivered') {
      const now = Date.now();
      const date = new Date(now);
      const issuedDate = new Date(now);
      date.setDate(date.getDate() + days + 1);
      const futureTimestamp = date.getTime();
      const futureDate = new Date(futureTimestamp);
      const futureDateString = futureDate.toISOString();
      const body = [
        {
          op: 'replace',
          path: 'status',
          value: value,
        },
        {
          op: 'replace',
          path: 'due_Date',
          value: futureDateString,
        },
        {
          op: 'replace',
          path: 'issued_Date',
          value: issuedDate,
        },
      ];
      return this.http.patch(`${this.baseurl}/status?reqid=${reqid}`, body, {
        headers,
      });
    }
    const body = [
      {
        op: 'replace',
        path: 'status',
        value: value,
      },
    ];
    return this.http.patch(`${this.baseurl}/status?reqid=${reqid}`, body, {
      headers,
    });
  }
}
