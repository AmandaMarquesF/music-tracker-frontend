import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';

declare var bootstrap: any; // Declaração global para acessar o Bootstrap

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        first_name: this.registerForm.value.firstName,
        last_name: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        birthdate: this.registerForm.value.birthDate,
        gender: this.registerForm.value.gender,
      };

      this.userService.register(user).subscribe(
        (response) => {
          console.log('User registered successfully!', response);
          this.toastr.success('Usuário criado com sucesso!');
          this.registerForm.reset();

          this.closeModal('registerModal');
        },
        (error) => {
          console.error('Error registering user', error);
          if (error.status === 400) {
            this.toastr.error(error.error.error);
          } else {
            this.toastr.error(
              'Erro ao registrar usuário. Tente novamente mais tarde.'
            );
          }
        }
      );
    }
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    }
  }
}
