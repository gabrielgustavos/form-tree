import { Injectable } from '@angular/core';
import { Usuario } from 'app/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFilterService {
  filterUsers(value: string, user: Usuario[]): Usuario[] {
    if (!value) {
      return user;
    }
    return user.filter((user: Usuario) => this.filter(value, user));
  }

  private filter(value: string, user: Usuario): boolean {
    return (
      user.nome.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.telefone.toLowerCase().includes(value.toLowerCase()) ||
      user.endereco.cep.toLowerCase().includes(value.toLowerCase())
    );
  }
}
