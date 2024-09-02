import { THEMES } from '../constants/theme-switcher.constants';

export type Themes = typeof THEMES;

export type Theme = Themes[keyof typeof THEMES];
