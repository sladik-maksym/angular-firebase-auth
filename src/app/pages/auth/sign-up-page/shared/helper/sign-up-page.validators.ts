import { AbstractControl, ValidationErrors } from '@angular/forms';
import { REGEX } from '../constants/sign-up-page.constants';

export const required = (control: AbstractControl): ValidationErrors | null => {
  return REGEX.REQUIRED.test(control.value) ? null : { required: true };
};

export const email = (control: AbstractControl): ValidationErrors | null => {
  return REGEX.EMAIL.test(control.value) ? null : { email: true };
};

export const password = (control: AbstractControl): ValidationErrors | null => {
  const errors = {
    required: !REGEX.PASSWORD.REQUIRED.test(control.value),
    minLength: !REGEX.PASSWORD.MIN_LENGTH.test(control.value),
    onlyLatin: !REGEX.PASSWORD.ONLY_LATIN.test(control.value),
    oneUppercase: !REGEX.PASSWORD.ONE_UPPERCASE.test(control.value),
    oneLowercase: !REGEX.PASSWORD.ONE_LOWERCASE.test(control.value),
    oneNumber: !REGEX.PASSWORD.ONE_NUMBER.test(control.value),
    noSpaces: !REGEX.PASSWORD.NO_SPACES.test(control.value),
    oneSpecialCharacter: !REGEX.PASSWORD.ONE_SPECIAL_CHARACTER.test(
      control.value
    ),
  };

  for (const error in errors) {
    const key = error as keyof typeof errors;
    if (!errors[key]) delete errors[key];
  }

  const hasErrors = Object.keys(errors).length > 0;

  return hasErrors ? errors : null;
};

export const matchPasswords = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  return password === repeatPassword ? null : { matchPasswords: true };
};
