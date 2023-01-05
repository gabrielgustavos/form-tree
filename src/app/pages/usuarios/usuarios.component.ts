import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/interface/user.interface';
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';
import { UserFilterService } from 'app/services/filter.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  showModal: boolean = false;
  usuariosOriginal: Usuario[] = [];
  public usuarioEdit: any;
  displayedColumns: string[] = [
    'nome',
    'email',
    'telefone',
    'endereco',
    'acoes',
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userFilterService: UserFilterService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: Usuario[]) => {
      this.usuariosOriginal = data;
      this.usuarios = data;
      localStorage.setItem('token', 'usuario');
    });
  }

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

  createUser() {
    this.usuarioEdit = null;
    this.openModal();
  }

  edit(usuario: Usuario) {
    this.usuarioEdit = usuario;
    this.openModal();
  }

  delete(id: number, data: Usuario) {
    if (confirm('Deseja realmente excluir?')) {
      this.deleteLogin(id, data);
      this.deleteUsuario(id);
      alert('Usuário excluído com sucesso!');
      window.location.reload();
    }
  }

  deleteLogin(id: number, data: any) {
    this.apiService.deleteLogin(id, data).subscribe((data) => {
      console.log(data);
    });
  }

  deleteUsuario(id: number) {
    this.apiService.deleteUser(id).subscribe((data) => {
      console.log(data);
    });
  }

  filterUsers(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.usuarios = this.userFilterService.filterUsers(
      valor,
      this.usuariosOriginal
    );
  }

  logout() {
    const token = 'Home';
    localStorage.setItem('token', token);
    if (token === 'Home' && confirm('Deseja realmente sair?')) {
      alert('Você foi deslogado com sucesso!');
      this.router.navigate(['/']);
    }
  }
}
