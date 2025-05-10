import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpService, private httpclient: HttpClient) {}

  // Helper function to get headers with Authorization token
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      }),
    };
  }

  // Get all books
  getBooks() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.getService('http://localhost:5000/api/book/getAll', true, {
      headers,
    });
  }

  getBookById(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.getService(
      `http://localhost:5000/api/book/getById?id=${id}`,
      true,
      {
        headers,
      }
    );
  }
}
