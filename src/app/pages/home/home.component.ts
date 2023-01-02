import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Acesso } from 'app/interface/user.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
    });
  }

  validateLogin(formValues: { email: string; senha: string }, data: Acesso[]) {
    return (
      formValues.email === data[0].email && formValues.senha === data[0].senha
    );
  }

  onSubmit() {
    this.apiService.getData().subscribe((res) => {
      if (this.validateLogin(this.loginForm.value, res)) {
        this.router.navigate(['/usuarios']);
      } else {
        alert(`Usuário inválido: ${this.loginForm.value.email}`);
      }
    });
  }
}
