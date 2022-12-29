import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/interface/user.interface';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  showModal: boolean = false;
  editModal: boolean = false;
  selectedEdit: Usuario[] = [];
  usuariosOriginal: Usuario[] = [];
  constructor(private apiService: ApiService) {}
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: any) => {
      this.usuariosOriginal = data;
      this.usuarios = data;
    });
  }

  displayedColumns: string[] = [
    'nome',
    'email',
    'telefone',
    'endereco',
    'acoes',
  ];

  delete(id: string) {
    if (confirm('Deseja realmente excluir?')) {
      this.apiService.deleteUser(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  private filtrar(valor: string, usuario: Usuario): boolean {
    return (
      usuario.nome.toLowerCase().includes(valor.toLowerCase()) ||
      usuario.email.toLowerCase().includes(valor.toLowerCase()) ||
      usuario.telefone.toLowerCase().includes(valor.toLowerCase()) ||
      usuario.endereco.cep.toLowerCase().includes(valor.toLowerCase())
    );
  }

  filtrarUsuarios(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    if (!valor) {
      this.usuarios = this.usuariosOriginal;
      return;
    }

    this.apiService.getUsers().subscribe((data: Usuario[]) => {
      this.usuarios = data.filter((usuario: Usuario) =>
        this.filtrar(valor, usuario)
      );
    });
  }

  filtrarUsuariosLocal(valor: string): void {
    if (!valor) {
      this.usuarios = this.usuariosOriginal;
      return;
    }

    this.usuarios = this.usuariosOriginal.filter((usuario: Usuario) =>
      this.filtrar(valor, usuario)
    );
  }
}
