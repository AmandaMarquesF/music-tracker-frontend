import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserAuth } from 'src/app/models/userAuth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userAuth: UserAuth = this.loginForm.value;
      this.authService.login(userAuth).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido!', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro de login', err);
        },
      });
    }
  }
}
