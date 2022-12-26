import { FormComponent } from './../../../components/form/form.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  constructor(public dialog: MatDialog, private http: HttpClient) {}
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
    'id',
    'email',
    'nome',
    'sobrenome',
    'telefone',
    'endereco',
  ];
}
