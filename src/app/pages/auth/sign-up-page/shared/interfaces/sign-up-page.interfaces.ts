import { FormControl, FormGroup } from '@angular/forms';

export type FormGroupUserDetails = FormGroup<{
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}>;

export type FormGroupOrganizationDetails = FormGroup<{
  accountType: FormControl<string>;
  organizationName: FormControl<string>;
  iotProvider: FormControl<string>;
}>;

export type SignUpForm = {
  userDetails: FormGroupUserDetails;
  organizationDetails: FormGroupOrganizationDetails;
};
