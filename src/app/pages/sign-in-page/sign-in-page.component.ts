import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignInForm } from './sign-in-page.interfaces';
import { ERROR_MESSAGES } from '../../constants/error-messages';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  signInForm = new FormGroup<SignInForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });
  isLoading: boolean = false;
  errorMessage: string | null = null;

  get emailError() {
    const email = this.signInForm.controls.email;
    const isInvalidFieldTouched = email.invalid && email.touched;

    if (isInvalidFieldTouched && email.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (isInvalidFieldTouched && email.errors?.['email']) {
      return ERROR_MESSAGES.INVALID_FORMAT;
    }

    return null;
  }

  get passwordError() {
    const password = this.signInForm.controls.password;
    const isInvalidFieldTouched = password.invalid && password.touched;

    if (isInvalidFieldTouched && password.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (isInvalidFieldTouched && !password.errors?.['minLength']) {
      return ERROR_MESSAGES.MIN_LENGTH(8);
    }

    return null;
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    if (!!this.errorMessage) {
      this.errorMessage = null;
    }

    this.authService.signIn(this.signInForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading = false;
        this.errorMessage = null;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        const isInvalidCredential =
          error.message ===
          'FirebaseError: Firebase: Error (auth/invalid-credential).';
        this.errorMessage = isInvalidCredential
          ? ERROR_MESSAGES.INVALID_CREDENTIAL
          : ERROR_MESSAGES.SOMETHING_WRONG;
      },
    });
  }
}
