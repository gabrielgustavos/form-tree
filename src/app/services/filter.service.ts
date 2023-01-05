import { Injectable } from '@angular/core';
import { Usuario } from 'app/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFilterService {
  filterUsers(valor: string, usuarios: Usuario[]): Usuario[] {
    if (!valor) {
      return usuarios;
    }
    return usuarios.filter((usuario: Usuario) => this.filtrar(valor, usuario));
  }

  private filtrar(valor: string, usuario: Usuario): boolean {
    return (
      usuario.nome.toLowerCase().includes(valor.toLowerCase()) ||
      usuario.email.toLowerCase().includes(valor.toLowerCase()) ||
      usuario.telefone.toLowerCase().includes(valor.toLowerCase()) ||
      usuario.endereco.cep.toLowerCase().includes(valor.toLowerCase())
    );
  }
}
