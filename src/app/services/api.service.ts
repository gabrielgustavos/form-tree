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
  private readonly acesso = api.acesso;
  private readonly usuarios = api.usuario;
  private readonly cepApi = 'https://viacep.com.br/ws';

  constructor(private readonly http: HttpClient) {}

  getData(): Observable<Object> {
    return this.http.get(this.acesso);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuarios);
  }

  postLogin(data: Acesso): Observable<Acesso> {
    return this.http.post<Acesso>(this.acesso, data);
  }

  postUser(data: Acesso): Observable<Acesso> {
    return this.http.post<Acesso>(this.usuarios, data);
  }

  updateUser(id: number, data: Acesso): Observable<Acesso> {
    return this.http.put<Acesso>(`${this.usuarios}${id}`, data);
  }

  updateLogin(id: number, data: Acesso): Observable<Acesso> {
    return this.http.put<Acesso>(`${this.acesso}/${id}`, data);
  }

  deleteUser(id: number): Observable<Acesso> {
    return this.http.delete<Acesso>(`${this.usuarios}${id}`);
  }

  deleteLogin(id: any, data: any): Observable<any> {
    return this.http.delete(`${this.acesso}/${id}`, data);
  }

  pesquisaCEP(cep: string): Observable<CEPResponse> {
    return this.http.get<CEPResponse>(`${this.cepApi}/${cep}/json/`);
  }
}
