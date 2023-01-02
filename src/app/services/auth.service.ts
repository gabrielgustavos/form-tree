import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  generateToken() {
    const token = Math.random().toString(36).substr(2);
    localStorage.setItem('token', token);
  }
}
