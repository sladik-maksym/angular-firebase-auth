export const REGEX = {
  REQUIRED: /^.+$/,
  EMAIL: /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/,
  PASSWORD: {
    REQUIRED: /^.+$/,
    MIN_LENGTH: /^.{8,}$/,
    ONLY_LATIN: /^[^ЁёА-я]+$/,
    ONE_UPPERCASE: /^(?=.*[A-Z]).*$/,
    ONE_LOWERCASE: /^(?=.*[a-z]).*$/,
    ONE_NUMBER: /^(?=.*\d).*$/,
    NO_SPACES: /^\S+$/,
    ONE_SPECIAL_CHARACTER:
      /^(?=.*[!@#$%^&*()\[\]{};:<>?+,.\\\-\/=|~])([a-zA-Z0-9!@#$%^&*()\[\]{};:<>?+,.\\\-\/=|~]*)$/,
  },
};
