import { FormControl, FormGroup } from '@angular/forms';

export type SignUpForm = {
  userDetails: FormGroup<{
    email: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    password: FormControl<string>;
    repeatPassword: FormControl<string>;
  }>;
  organizationDetails: FormGroup<{
    accountType: FormControl<string>;
    organizationName: FormControl<string>;
    iotProvider: FormControl<string>;
  }>;
};
