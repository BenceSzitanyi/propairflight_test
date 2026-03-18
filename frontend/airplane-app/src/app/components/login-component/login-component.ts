import { Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ['pilot@airline.com', [Validators.required, Validators.email]],
    password: ['pilot123', Validators.required],
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => this.router.navigate(['/airplanes']),
        error: (err) => alert(`Login failed: ${err.error?.message}`),
      });
    }
  }
}
