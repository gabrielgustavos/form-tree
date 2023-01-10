import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Acesso } from 'app/interface/user.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  token = 'Home';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
    localStorage.setItem('token', this.token);
  }

  onSubmit() {
    this.apiService.getData().subscribe((res) => {
      const data = res as Acesso[];
      const email = this.loginForm.get('email')?.value;
      const senha = this.loginForm.get('senha')?.value;
      const user = data.find((item) => item.email === email);
      if (user?.senha === senha) {
        this.router.navigate(['/usuarios']);
        localStorage.removeItem('token');
        alert('Entrando...');
      } else {
        alert('Usuário ou senha incorretos');
      }
    });
  }
}
