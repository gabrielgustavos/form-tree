import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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

  deleteUser(id: any): Observable<any> {
    return this.http.delete('http://localhost:3000/usuarios/' + id);
  }

  pesquisaCEP(cep: string) {
    let apiURL = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http
      .get(apiURL)
      .pipe(map((dados) => dados))
  }
}
