export const CALC_INITIAL_DISPLAY_VALUE = '0';

export const CALC_BUTTONS = [
  { title: 'AC', class: 'btnClearAndControl', action: 'changeControl' },
  { title: '+/-', class: 'btnClearAndControl', action: 'changeControl' },
  { title: '%', class: 'btnClearAndControl', action: 'changeControl' },
  { title: '÷', class: 'btnArithmeticOperator', action: 'changeOperator' },
  { title: '1', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '2', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '3', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: 'x', class: 'btnArithmeticOperator', action: 'changeOperator' },
  { title: '4', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '5', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '6', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '-', class: 'btnArithmeticOperator', action: 'changeOperator' },
  { title: '7', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '8', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '9', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '+', class: 'btnArithmeticOperator', action: 'changeOperator' },
  { title: '0', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '.', class: 'btnNumberAndDecimal', action: 'changeValue' },
  { title: '=', class: 'btnArithmeticOperator', action: 'calculate' },
];

export const CALC_OPERATOR_MAP: Record<string, string> = {
  '÷': '/',
  x: '*',
  '-': '-',
  '+': '+',
};
