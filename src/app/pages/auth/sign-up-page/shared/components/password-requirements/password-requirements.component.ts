import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ERROR_LIST } from './shared/constants/password-requirements.constants';

@Component({
  selector: 'app-password-requirements',
  standalone: true,
  imports: [NgClass],
  templateUrl: './password-requirements.component.html',
  styleUrl: './password-requirements.component.scss',
})
export class PasswordRequirementsComponent {
  @Input({ required: true }) errors: ValidationErrors | null = null;
  errorList = ERROR_LIST;
}
