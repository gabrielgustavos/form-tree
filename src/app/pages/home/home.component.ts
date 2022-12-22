import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  form: FormGroup;

  constructor(private apiService: ApiService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
    });
  }

  onSubmit() {
    this.apiService.getData().subscribe((res) => {
      const validateLogin =
        this.form.value.email === res[0].email &&
        this.form.value.senha === res[0].senha;
      if (validateLogin) this.router.navigate(['/menu']);
    });
  }
}
