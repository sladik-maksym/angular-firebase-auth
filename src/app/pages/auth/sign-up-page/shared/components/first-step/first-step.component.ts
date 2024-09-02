import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroupUserDetails } from '../../interfaces/sign-up-page.interfaces';
import { PasswordRequirementsComponent } from '../password-requirements/password-requirements.component';
import { ERROR_MESSAGES } from '../../../../../../shared/constants/error-messages';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [NgClass, PasswordRequirementsComponent, ReactiveFormsModule],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss',
})
export class FirstStepComponent {
  @Input({ required: true }) formGroupUserDetails!: FormGroupUserDetails;

  get repeatPasswordFieldVisible() {
    return !this.formGroupUserDetails.controls.password.invalid;
  }

  get emailError() {
    const email = this.formGroupUserDetails.controls.email;
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
    const firstName = this.formGroupUserDetails.controls.firstName;
    const isInvalidFieldTouched = firstName.invalid && firstName.touched;

    if (isInvalidFieldTouched && firstName.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get lastNameError() {
    const lastName = this.formGroupUserDetails.controls.lastName;
    const isInvalidFieldTouched = lastName.invalid && lastName.touched;

    if (isInvalidFieldTouched && lastName.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get passwordError() {
    const password = this.formGroupUserDetails.controls.password;
    const isInvalidFieldTouched = password.invalid && password.touched;

    if (isInvalidFieldTouched) {
      return true;
    }

    return null;
  }

  get repeatPasswordError() {
    const hasError = this.formGroupUserDetails.errors?.['matchPasswords'];

    const isRepeatPasswordTouched =
      this.formGroupUserDetails.controls.repeatPassword.touched;

    if (hasError && isRepeatPasswordTouched) {
      return ERROR_MESSAGES.NOT_MATCH_PASSWORD;
    }

    return null;
  }
}
