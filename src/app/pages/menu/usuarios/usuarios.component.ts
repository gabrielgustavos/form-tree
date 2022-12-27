import { FormComponent } from './../../../components/form/form.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private apiService: ApiService
  ) {}
  public datas: any = [];
  openDialog() {
    this.dialog.open(FormComponent);
  }
  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/usuarios')
      .pipe(map((dados) => dados))
      .subscribe((dados) => {
        this.datas = dados;
        console.log(this.datas);
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
      this.apiService.deleteUser(id).subscribe((data) => {
        this.ngOnInit();
      });
    }
  }
}
