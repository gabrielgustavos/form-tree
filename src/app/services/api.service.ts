import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'environment/environment';
import { CEPResponse } from 'app/interface/api.interface';
import { Acesso } from 'app/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly acesso = api.acesso;
  private readonly usuarios = api.usuario;
  private readonly cepApi = 'https://viacep.com.br/ws';

  constructor(private readonly http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.acesso);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.usuarios);
  }

  postLogin(data: Acesso): Observable<any> {
    return this.http.post(this.acesso, data);
  }

  postUser(data: Acesso): Observable<any> {
    return this.http.post(this.usuarios, data);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/usuarios/${id}`, data);
  }

  updateLogin(id: any, data: any): Observable<any> {
    return this.http.put(`${this.acesso}/${id}`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.usuarios}${id}`);
  }

  deleteLogin(id: any, data: any): Observable<any> {
    return this.http.delete(`${this.acesso}/${id}`, data);
  }

  pesquisaCEP(cep: string): Observable<CEPResponse> {
    return this.http.get<CEPResponse>(`${this.cepApi}/${cep}/json/`);
  }
}
