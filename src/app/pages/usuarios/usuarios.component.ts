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
    'selecionado',
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
      localStorage.setItem('token', 'true');
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
    console.log(this.usuarioEdit);
    this.usuarioEdit = usuario;
    this.openModal();
  }

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

  logout() {
    const token = 'Home';
    localStorage.setItem('token', token);
    if (token === 'Home') {
      alert('Você foi deslogado com sucesso!');
      this.router.navigate(['/']);
    }
  }

  usuariosSelecionados: any = [];

  selectedUsers(id: number) {
    if (this.usuariosSelecionados.includes(id)) {
      this.usuariosSelecionados.splice(
        this.usuariosSelecionados.indexOf(id),
        1
      );
    } else {
      this.usuariosSelecionados.push(id);
    }
    console.log(this.usuariosSelecionados);
  }

  deleteSelectedUsers() {
    if (confirm('Deseja realmente excluir?')) {
      this.usuariosSelecionados.forEach((id: number) => {
        if (this.usuariosSelecionados.includes(id)) {
          this.apiService.deleteUser(id).subscribe(() => {
            this.ngOnInit();
            this.usuariosSelecionados = [];
          });
        }
      });
    }
  }
}
