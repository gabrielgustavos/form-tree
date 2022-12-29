import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginForm: FormGroup;

  constructor(private apiService: ApiService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
    });
  }

  onSubmit() {
    this.apiService.getData().subscribe((res) => {
      const validateLogin =
        this.loginForm.value.email === res[0].email &&
        this.loginForm.value.senha === res[0].senha;
      if (validateLogin) {
        this.router.navigate(['/usuarios']);
      } else {
        alert('Usuário inválido!');
      }
    });
  }

 
}
