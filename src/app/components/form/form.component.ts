import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Endereco } from 'src/app/interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  hide = true;
  cadastroForm: FormGroup;
  loading = false;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(ApiService) private cepService: ApiService
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: this.formBuilder.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        localidade: ['', Validators.required],
        uf: ['', Validators.required],
        cep: ['', Validators.required],
      }),
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formIsValid()) {
      this.apiService.postUser({ ...this.cadastroForm.value }).subscribe(
        (res) => {
          this.closeDialog();
          
        },
        (error) => {
          this.showErrorMessage();
        }
      );
    } else {
      this.showErrorMessage();
    }
  }

  formIsValid() {
    return this.cadastroForm.valid;
  }

  showErrorMessage() {
    alert('Preencha todos os campos corretamente!');
  }

  pesquisaCEP(event: any) {
    this.loading = true;
    let cep = (event.target as HTMLInputElement).value;
    this.cepService.pesquisaCEP(cep).subscribe(
      (dados: any) => {
        this.loading = false;
        this.populaDadosForm(dados);
      },
      (error) => {
        this.loading = false;
        alert(`Digite o cep corretamente!`);
      }
    );
  }

  applyEnderecoValues(endereco: Endereco) {
    this.cadastroForm.patchValue({
      endereco: { ...endereco },
    });
  }

  populaDadosForm(endereco: Endereco) {
    this.applyEnderecoValues(endereco);
  }
}
