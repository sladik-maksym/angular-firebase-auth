import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages';
import { AuthService } from '../../../core/services/auth.service';
import { FirstStepComponent } from './shared/components/first-step/first-step.component';
import { SecondStepComponent } from './shared/components/second-step/second-step.component';
import { SignUpForm } from './shared/interfaces/sign-up-page.interfaces';
import {
  email,
  matchPasswords,
  password,
  required,
} from './shared/helper/sign-up-page.validators';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass, 
    SecondStepComponent,
    FirstStepComponent,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  signUpForm = new FormGroup<SignUpForm>({
    userDetails: new FormGroup(
      {
        email: new FormControl('', {
          nonNullable: true,
          validators: [required.bind(this), email.bind(this)],
        }),
        firstName: new FormControl('', {
          nonNullable: true,
          validators: [required.bind(this)],
        }),
        lastName: new FormControl('', {
          nonNullable: true,
          validators: [required.bind(this)],
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [password.bind(this)],
        }),
        repeatPassword: new FormControl('', {
          nonNullable: true,
        }),
      },
      { validators: matchPasswords.bind(this) }
    ),
    organizationDetails: new FormGroup({
      accountType: new FormControl('', {
        nonNullable: true,
        validators: [required.bind(this)],
      }),
      organizationName: new FormControl('', {
        nonNullable: true,
        validators: [required.bind(this)],
      }),
      iotProvider: new FormControl('', {
        nonNullable: true,
        validators: [required.bind(this)],
      }),
    }),
  });
  currentStep = 1;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  setNextStep() {
    const isUserDetailsInvalid = this.signUpForm.controls.userDetails.invalid;

    if (isUserDetailsInvalid) {
      this.signUpForm.controls.userDetails.markAllAsTouched();
      return;
    }

    this.currentStep = 2;
  }

  setPrevStep() {
    if (!!this.errorMessage) {
      this.errorMessage = null;
    }

    this.currentStep = 1;
  }

  onSubmit() {
    const isOrganizationDetailsInvalid =
      this.signUpForm.controls.organizationDetails.invalid;

    if (isOrganizationDetailsInvalid) {
      this.signUpForm.controls.organizationDetails.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValues = this.signUpForm.getRawValue();
    if (!!this.errorMessage) {
      this.errorMessage = null;
    }

    this.authService
      .signUp({
        email: formValues.userDetails.email,
        password: formValues.userDetails.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.errorMessage = null;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = ERROR_MESSAGES.SOMETHING_WRONG;
        },
      });
  }
}
