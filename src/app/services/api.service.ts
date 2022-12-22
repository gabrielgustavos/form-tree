import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get('http://localhost:3000/acesso');
  }

  postUser(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/usuarios', data);
  }
}
