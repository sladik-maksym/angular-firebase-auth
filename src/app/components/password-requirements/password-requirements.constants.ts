import { ERROR_MESSAGES } from '../../constants/error-messages';

export const ERROR_LIST = [
  { value: 'oneNumber', label: ERROR_MESSAGES.PASSWORD.ONE_NUMBER },
  { value: 'onlyLatin', label: ERROR_MESSAGES.PASSWORD.ONLY_LATIN },
  { value: 'oneUppercase', label: ERROR_MESSAGES.PASSWORD.ONE_UPPERCASE },
  { value: 'oneLowercase', label: ERROR_MESSAGES.PASSWORD.ONE_LOWERCASE },
  { value: 'minLength', label: ERROR_MESSAGES.PASSWORD.MIN_LENGTH },
  { value: 'noSpaces', label: ERROR_MESSAGES.PASSWORD.NO_SPACES },
  {
    value: 'oneSpecialCharacter',
    label: ERROR_MESSAGES.PASSWORD.ONE_SPECIAL_CHARACTER,
  },
];
