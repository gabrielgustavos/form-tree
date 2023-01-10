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
  loading = false;
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private apiService: ApiService,
    private usuariosComponent: UsuariosComponent,
    private fb: FormBuilder
  ) {}

  usuarioEdit = this.usuariosComponent.usuarioEdit;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        localidade: ['', Validators.required],
        uf: ['', Validators.required],
        cep: ['', Validators.required],
      }),
    });
    if (this.usuarioEdit) {
      this.registerForm.patchValue(this.usuarioEdit);
    }
  }

  loginData = {
    id: this.registerForm.value.id,
    email: this.registerForm.value.email,
    senha: this.registerForm.value.senha,
  };

  sendData() {
    if (!this.formIsValid()) {
      this.showErrorMessage();
      return;
    }
    this.usuarioEdit ? this.editAccount() : this.createAccount();
  }

  editAccount() {
    this.updateUser();
    this.updateLogin();
    this.closeModal();
  }

  createAccount() {
    this.createUser();
    this.createLogin();
    this.closeModal();
  }

  createUser() {
    this.apiService.postUser(this.registerForm.value).subscribe(
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
      .postLogin({ ...this.loginData })
      .subscribe((data: Acesso) => {
        return;
      });
  }

  updateUser() {
    this.apiService
      .updateUser(this.usuarioEdit.id, this.registerForm.value)
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
        ...this.loginData,
      })
      .subscribe((data: Acesso) => {
        return;
      });
  }

  searchZip(event: FocusEvent) {
    this.loading = true;
    const zipData: string = (event.target as HTMLInputElement).value;
    this.apiService.searchZip(zipData).subscribe(
      (data: CEPResponse) => {
        this.loading = false;
        this.registerForm.patchValue({
          endereco: { ...data },
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
    return this.registerForm.valid;
  }

  closeModal() {
    this.usuariosComponent.closeModal();
  }
}
