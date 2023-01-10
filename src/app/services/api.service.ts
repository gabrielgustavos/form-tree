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
  private readonly acesso = api.access;
  private readonly users = api.user;
  private readonly URL_API_ZIP = 'https://viacep.com.br/ws';

  constructor(private readonly http: HttpClient) {}

  getData(): Observable<Object> {
    return this.http.get(this.acesso);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.users);
  }

  postLogin(userData: Acesso): Observable<Acesso> {
    return this.http.post<Acesso>(this.acesso, userData);
  }

  postUser(userData: Acesso): Observable<Acesso> {
    return this.http.post<Acesso>(this.users, userData);
  }

  updateUser(id: number, userData: Acesso): Observable<Acesso> {
    return this.http.put<Acesso>(`${this.users}${id}`, userData);
  }

  updateLogin(id: number, userData: Acesso): Observable<Acesso> {
    return this.http.put<Acesso>(`${this.acesso}/${id}`, userData);
  }

  deleteUser(id: number): Observable<Acesso> {
    return this.http.delete<Acesso>(`${this.users}${id}`);
  }

  deleteLogin(id: any, userData: any): Observable<any> {
    return this.http.delete(`${this.acesso}/${id}`, userData);
  }

  searchZip(zip: string): Observable<CEPResponse> {
    return this.http.get<CEPResponse>(`${this.URL_API_ZIP}/${zip}/json/`);
  }
}
