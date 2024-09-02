import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ERROR_MESSAGES } from '../../../../../../shared/constants/error-messages';
import { FormGroupOrganizationDetails } from '../../interfaces/sign-up-page.interfaces';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-second-step',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss',
})
export class SecondStepComponent {
  @Input({ required: true })
  formGroupOrganizationDetails!: FormGroupOrganizationDetails;

  get accountTypeError() {
    const accountType = this.formGroupOrganizationDetails.controls.accountType;
    const isInvalidFieldTouched = accountType.invalid && accountType.touched;

    if (isInvalidFieldTouched && accountType.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get organizationNameError() {
    const organizationName =
      this.formGroupOrganizationDetails.controls.organizationName;
    const isInvalidFieldTouched =
      organizationName.invalid && organizationName.touched;

    if (isInvalidFieldTouched && organizationName.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }

  get iotProviderError() {
    const iotProvider = this.formGroupOrganizationDetails.controls.iotProvider;
    const isInvalidFieldTouched = iotProvider.invalid && iotProvider.touched;

    if (isInvalidFieldTouched && iotProvider.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    return null;
  }
}
