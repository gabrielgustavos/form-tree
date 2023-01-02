import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/interface/user.interface';
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UserFilterService } from 'app/services/user-filter.service';
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
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private userFilterService: UserFilterService
  ) {}

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

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: any) => {
      this.usuariosOriginal = data;
      this.usuarios = data;
      this.authService.generateToken();
    });
  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
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

  filterUsers(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.usuarios = this.userFilterService.filterUsers(
      valor,
      this.usuariosOriginal
    );
  }

  edit(usuario: Usuario) {
    this.usuarioEdit = usuario;
    this.openModal();
  }
}
