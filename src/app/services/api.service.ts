import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'environment/environment';
import { CEPResponse } from '../interface/api.interface';

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

  postUser(data: any): Observable<any> {
    return this.http.post(`${this.usuarios}`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.usuarios}${id}`);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put('http://localhost:3000/usuarios/' + id, data);
  }

  pesquisaCEP(cep: string): Observable<CEPResponse> {
    const CEP_API = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<CEPResponse>(CEP_API);
  }
}
