import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl: string = 'https://localhost:7085/api/AdminBook';

  constructor(private http: HttpClient) {}

  getBooksByGenre(genres: string[]): Observable<any> {
    return this.http.get(`${this.baseUrl}/category?genres=${genres.join('&genres=')}`);
  }
}
