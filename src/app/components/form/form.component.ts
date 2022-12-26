import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  hide = true;
  cadastroForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.cadastroForm = new FormGroup({
      email: new FormControl('', Validators.email),
      // turn nome into required
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      senha: new FormControl(''),
      telefone: new FormControl(''),
      endereco: new FormGroup({
        logradouro: new FormControl(''),
        bairro: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        numero: new FormControl(''),
        cep: new FormControl(''),
      }),
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.apiService.postUser(this.cadastroForm.value).subscribe((res) => {
        this.closeDialog();
      });
    } else {
      alert('Preencha os campos corretamente');
    }
  }

  pesquisaCEP(event: any) {
    let cep = (event.target as HTMLInputElement).value;
    let apiURL = `https://viacep.com.br/ws/${cep}/json/`;
    this.http
      .get(apiURL)
      .pipe(map((dados) => dados))
      .subscribe((dados) => this.populaDadosForm(dados));
  }

  populaDadosForm(dados: any) {
    this.cadastroForm.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        cep: dados.cep,
      },
    });
  }
}
