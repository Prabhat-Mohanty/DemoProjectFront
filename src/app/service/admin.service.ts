import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  baseurl = environment.adminController;

  // Get all books
  getAllBooks() {
    return this.http.get(`${this.baseurl}/getAllBooksWithAuthorId`);
  }
  getAllBooksWithFilters(filter: {
    bookname: string;
    pageNumber: number;
    pageSize: number;
  }) {
    const bookname = filter.bookname;
    const pageNumber = filter.pageNumber;
    const pageSize = filter.pageSize;
    return this.http.get(
      `${this.baseurl}/getAllBooksWithAuthorIdWithFilters?bookname=${bookname}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  addBook(formData: any) {
    return this.http.post(`${this.baseurl}/addbook`, formData);
  }

  editBook(id: number) {
    return this.http.get(`${this.baseurl}/GetBookByIds/${id}`);
  }

  updateBook(id: number, formData: any) {
    return this.http.put(`${this.baseurl}/updatebook/${id}`, formData);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.baseurl}/deleteBook/${id}`);
  }

  // --------------------Author--------------------
  // Get all authors
  getAllAuthors() {
    return this.http.get(`${this.baseurl}/getAllAuthor`);
  }

  //Add author
  addAuthor(authorName: any) {
    return this.http.post(`${this.baseurl}/addAuthor`, authorName);
  }

  //Get Author By Id
  editAuthor(id: number) {
    return this.http.get(`${this.baseurl}/getauthorbyid/${id}`);
  }

  //Update Author
  updateAuthor(id: number, name: string) {
    const apiUrl = `${this.baseurl}/updateAuthor/${id}`;
    const body = `"${name}"`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(apiUrl, body, { headers: headers });
  }

  //delete author
  deleteAuthor(id: number) {
    return this.http.delete(`${this.baseurl}/deleteAuthor/${id}`);
  }

  // --------------------Publisher--------------------

  //Get All Publisher
  getAllPublisher() {
    return this.http.get(`${this.baseurl}/getAllPublisher`);
  }

  //Add publisher
  addPublisher(publisherName: any) {
    return this.http.post(`${this.baseurl}/addPublisher`, publisherName);
  }

  // Get Publisher By Id
  editPublisher(id: number) {
    return this.http.get(`${this.baseurl}/getpublisherbyid/${id}`);
  }

  //Update Publisher
  updatePublisher(id: number, name: string) {
    const apiUrl = `${this.baseurl}/updatePublisher/${id}`;
    const body = `"${name}"`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(apiUrl, body, { headers: headers });
  }

  //delete publisher
  deletePublisher(id: number) {
    return this.http.delete(`${this.baseurl}/deletePublisher/${id}`);
  }

  // --------------------Issued Book Actions--------------------

  getAllRequest(status: string[], pageNumber: number, pageSize: number) {
    return this.http.get(
      // `${this.baseurl}/getpendingrequest?status=${status.join(' ')}`,
      `${this.baseurl}/getpendingrequest?status=${status.join(
        '&status='
      )}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  changeStatus(value: string, reqid: number, days: number, email: string) {
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
      return this.http.patch(
        `${this.baseurl}/status?reqid=${reqid}&email=${email}`,
        body
      );
    }
    const body = [
      {
        op: 'replace',
        path: 'status',
        value: value,
      },
    ];
    return this.http.patch(
      `${this.baseurl}/status?reqid=${reqid}&email=${email}`,
      body
    );
  }

  // --------------------Contact Us--------------------
  contactUs(data: any) {
    return this.http.post(`${this.baseurl}/contact`, data);
  }

  getContactDetails(email: string, pageSize: number, pageNumber: number) {
    if (email.length >= 1) {
      return this.http.get(
        `${this.baseurl}/getContactList?email=${email}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
    }
    return this.http.get(
      `${this.baseurl}/getContactList?pageSize=${pageSize}&pageNumber=${pageNumber} `
    );
  }

  getUserDetails() {
    return this.http.get(`${this.baseurl}/getUserList`);
  }

  getStatusCount() {
    return this.http.get(`${this.baseurl}/getStats`);
  }
}
