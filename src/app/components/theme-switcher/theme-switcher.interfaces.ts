import { THEMES } from './theme-switcher.constants';

export type Themes = typeof THEMES;

export type Theme = Themes[keyof typeof THEMES];
