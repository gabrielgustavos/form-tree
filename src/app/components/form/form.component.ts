import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Endereco } from 'app/interface/user.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  hide = true;
  cadastroForm: FormGroup;
  loading = false;

  constructor(
    private apiService: ApiService,
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.formIsValid()) {
      this.apiService.postUser(this.cadastroForm.value).subscribe(() => {
        this.cadastroForm.reset();
        alert('Cadastro realizado com sucesso!');
      });
    } else {
      this.showErrorMessage();
    }
  }

  showErrorMessage() {
    alert('Preencha todos os campos corretamente!');
  }

  formIsValid() {
    return this.cadastroForm.valid;
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
