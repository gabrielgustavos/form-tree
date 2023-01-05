import { CEPResponse } from 'app/interface/api.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { UsuariosComponent } from 'app/pages/usuarios/usuarios.component';
import { Acesso } from 'app/interface/user.interface';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  hide = true;
  cadastroForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private usuariosComponent: UsuariosComponent
  ) {}

  usuarioEdit = this.usuariosComponent.usuarioEdit;

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: this.formBuilder.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        localidade: ['', Validators.required],
        uf: ['', Validators.required],
        cep: ['', Validators.required],
      }),
    });
    if (this.usuarioEdit) {
      this.cadastroForm.patchValue(this.usuarioEdit);
    }
  }

  onSubmit() {
    if (this.formIsValid()) {
      if (this.usuarioEdit) {
        this.updateUser();
        this.updateLogin();
        this.closeModal();
      } else {
        this.createUser();
        this.createLogin();
        this.closeModal();
      }
    } else {
      this.showErrorMessage();
    }
  }

  createUser() {
    this.apiService.postUser(this.cadastroForm.value).subscribe(
      () => {
        alert('Cadastro realizado com sucesso!');
        window.location.reload();
      },
      (error) => {
        console.error(error);
        alert('Ocorreu um erro ao realizar o cadastro');
      }
    );
  }

  createLogin() {
    this.apiService
      .postLogin({
        id: this.cadastroForm.value.id,
        email: this.cadastroForm.value.email,
        senha: this.cadastroForm.value.senha,
      })
      .subscribe((data: Acesso) => {
        console.log(data);
      });
  }

  updateUser() {
    this.apiService
      .updateUser(this.usuarioEdit.id, this.cadastroForm.value)
      .subscribe(
        () => {
          alert('Usuario editado com sucesso!');
          window.location.reload();
        },
        (error) => {
          console.error(error);
          alert('Ocorreu um erro ao realizar o cadastro');
        }
      );
  }

  updateLogin() {
    this.apiService
      .updateLogin(this.usuarioEdit.id, {
        id: this.cadastroForm.value.id,
        email: this.cadastroForm.value.email,
        senha: this.cadastroForm.value.senha,
      })
      .subscribe((data: Acesso) => {
        console.log(data);
      });
  }

  pesquisaCEP(event: FocusEvent) {
    this.loading = true;
    const cepDigitado: string = (event.target as HTMLInputElement).value;
    this.apiService.pesquisaCEP(cepDigitado).subscribe(
      (dados: CEPResponse) => {
        this.loading = false;
        this.cadastroForm.patchValue({
          endereco: { ...dados },
        });
      },
      (error) => {
        this.loading = false;
        alert(`Digite o cep corretamente!`);
      }
    );
  }

  showErrorMessage() {
    alert('Preencha todos os campos corretamente!');
  }

  formIsValid() {
    return this.cadastroForm.valid;
  }

  closeModal() {
    this.usuariosComponent.closeModal();
  }
}
