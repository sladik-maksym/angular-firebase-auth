export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Required field',
  INVALID_FORMAT: 'Invalid format',
  MIN_LENGTH: (value: number) => `Min length ${value}`,
  INVALID_CREDENTIAL: 'Invalid credential',
  SOMETHING_WRONG: 'Whoops! Something went wrong. Please try again.',
  NOT_MATCH_PASSWORD: 'Does not match to password',
  PASSWORD: {
    ONE_NUMBER: 'Have at least one number',
    ONLY_LATIN: 'Only latin',
    ONE_UPPERCASE: 'Have at least one uppercase',
    ONE_LOWERCASE: 'Have at least one lowercase',
    MIN_LENGTH: 'Be at least 8 characters long',
    NO_SPACES: 'No spaces',
    ONE_SPECIAL_CHARACTER: 'Have at least one special character',
  },
};
