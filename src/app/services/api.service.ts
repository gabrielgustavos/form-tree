import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'environment/environment';
import { CEPResponse } from 'app/interface/api.interface';
import { Acesso, Usuario } from 'app/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private acesso = api.acesso;
  private usuarios = api.usuario;
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.acesso);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.usuarios}`);
  }

  postLogin(data: Acesso): Observable<any> {
    return this.http.post(`${this.acesso}`, data);
  }

  postUser(data: Acesso): Observable<any> {
    return this.http.post(`${this.usuarios}`, data);
  }

  deleteUser(id: number | string): Observable<any> {
    return (
      this.http.delete(`${this.usuarios}${id}`) &&
      this.http.delete(`${this.acesso}${id}`)
    );
  }

  updateUser(id: number | string, data: Usuario[]): Observable<any> {
    return this.http.put('http://localhost:3000/usuarios/' + id, data);
  }

  pesquisaCEP(cep: string): Observable<CEPResponse> {
    const CEP_API = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<CEPResponse>(CEP_API);
  }
}
