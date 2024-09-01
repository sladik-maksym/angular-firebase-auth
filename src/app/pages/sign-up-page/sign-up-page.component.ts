import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordRequirementsComponent } from '../../components/password-requirements/password-requirements.component';
import { AuthService } from '../../services/auth.service';
import { SignUpForm } from './sign-up-page.interfaces';
import {
  email,
  matchPasswords,
  password,
  required,
} from './sign-up-page.validators';
import { ERROR_MESSAGES } from '../../constants/error-messages';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    PasswordRequirementsComponent,
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

  get repeatPasswordFieldVisible() {
    return !this.signUpForm.controls.userDetails.controls.password.invalid;
  }

  get emailError() {
    const email = this.signUpForm.controls.userDetails.controls.email;
    const isInvalidFieldTouched = email.invalid && email.touched;

    if (isInvalidFieldTouched && email.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (isInvalidFieldTouched && email.errors?.['email']) {
      return ERROR_MESSAGES.INVALID_FORMAT;
    }

    return null;
  }

  get firstNameError() {
    const firstName = this.signUpForm.controls.userDetails.controls.firstName;
    const isInvalidFieldTouched = firstName.invalid && firstName.touched;

    if (isInvalidFieldTouched && firstName.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get lastNameError() {
    const lastName = this.signUpForm.controls.userDetails.controls.lastName;
    const isInvalidFieldTouched = lastName.invalid && lastName.touched;

    if (isInvalidFieldTouched && lastName.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get passwordError() {
    const password = this.signUpForm.controls.userDetails.controls.password;
    const isInvalidFieldTouched = password.invalid && password.touched;

    if (isInvalidFieldTouched) {
      return true;
    }

    return null;
  }

  get repeatPasswordError() {
    const hasError =
      this.signUpForm.controls.userDetails.errors?.['matchPasswords'];

    const isRepeatPasswordTouched =
      this.signUpForm.controls.userDetails.controls.repeatPassword.touched;

    if (hasError && isRepeatPasswordTouched) {
      return ERROR_MESSAGES.NOT_MATCH_PASSWORD;
    }

    return null;
  }

  get accountTypeError() {
    const accountType =
      this.signUpForm.controls.organizationDetails.controls.accountType;
    const isInvalidFieldTouched = accountType.invalid && accountType.touched;

    if (isInvalidFieldTouched && accountType.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get organizationNameError() {
    const organizationName =
      this.signUpForm.controls.organizationDetails.controls.organizationName;
    const isInvalidFieldTouched =
      organizationName.invalid && organizationName.touched;

    if (isInvalidFieldTouched && organizationName.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get iotProviderError() {
    const iotProvider =
      this.signUpForm.controls.organizationDetails.controls.iotProvider;
    const isInvalidFieldTouched = iotProvider.invalid && iotProvider.touched;

    if (isInvalidFieldTouched && iotProvider.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }
}
