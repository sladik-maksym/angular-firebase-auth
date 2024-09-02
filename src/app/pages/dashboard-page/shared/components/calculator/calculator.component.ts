import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { evaluate } from 'mathjs';
import {
  CALC_BUTTONS,
  CALC_INITIAL_DISPLAY_VALUE,
  CALC_OPERATOR_MAP,
} from './shared/constants/calculator.constants';
import { ButtonHoverEffectDirective } from '../../../../../shared/directives/button-hover-effect.directive';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [NgClass, ButtonHoverEffectDirective],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  @ViewChild('calculatorDisplay')
  calculatorDisplayRef!: ElementRef<HTMLDivElement>;

  displayValue: string = CALC_INITIAL_DISPLAY_VALUE;
  currentValue: string | null = null;
  previousValue: string | null = null;
  operator: string | null = null;

  calcButtons = CALC_BUTTONS;
  buttonActionsMap: { [key: string]: (value: string) => void } = {
    changeControl: this.changeControl.bind(this),
    changeValue: this.changeValue.bind(this),
    changeOperator: this.changeOperator.bind(this),
    calculate: this.calculate.bind(this),
  };

  changeValue(nextValue: string) {
    const hasDisplayValueDot = this.displayValue.includes('.');
    const hasOperator = !!this.operator;

    if (
      (nextValue === '.' && hasDisplayValueDot) ||
      (this.displayValue === CALC_INITIAL_DISPLAY_VALUE &&
        nextValue === CALC_INITIAL_DISPLAY_VALUE) ||
      (this.displayValue === '-0' && nextValue === CALC_INITIAL_DISPLAY_VALUE)
    ) {
      return;
    }

    if (hasOperator) {
      this.currentValue = this.currentValue
        ? (this.currentValue += nextValue)
        : nextValue;
      this.displayValue = this.currentValue!;
    } else {
      if (
        (this.displayValue === CALC_INITIAL_DISPLAY_VALUE ||
          this.displayValue === '-0') &&
        nextValue !== CALC_INITIAL_DISPLAY_VALUE &&
        nextValue !== '.'
      ) {
        this.previousValue = nextValue;
        this.displayValue = this.previousValue;
      } else {
        this.previousValue = this.previousValue
          ? (this.previousValue += nextValue)
          : (this.displayValue += nextValue);
        this.displayValue = this.previousValue!;
      }
    }

    this.scrollToBottom();
  }

  changeControl(control: string) {
    const hasCurrentValue = !!this.currentValue;
    const hasPreviousValue = !!this.previousValue;

    switch (control) {
      case 'AC':
        this.displayValue = CALC_INITIAL_DISPLAY_VALUE;
        this.currentValue = null;
        this.previousValue = null;
        this.operator = null;

        break;

      case '+/-':
        const isDisplayValueNegative = this.displayValue.includes('-');
        this.displayValue = isDisplayValueNegative
          ? this.displayValue.replace('-', '')
          : `-${this.displayValue}`;

        if (
          (!hasPreviousValue && !hasCurrentValue) ||
          (hasPreviousValue && !hasCurrentValue)
        ) {
          this.previousValue = this.displayValue;
          return;
        }

        if (hasPreviousValue && hasCurrentValue) {
          this.currentValue = this.displayValue;
          return;
        }

        break;

      case '%':
        const nextValue = evaluate(`${this.displayValue} / 100`);
        this.displayValue = `${nextValue}`;

        if (
          (!hasPreviousValue && !hasCurrentValue) ||
          (hasPreviousValue && !hasCurrentValue)
        ) {
          this.previousValue = this.displayValue;
          return;
        }

        if (hasPreviousValue && hasCurrentValue) {
          this.currentValue = this.displayValue;
          return;
        }

        break;
    }
  }

  changeOperator(nextOperator: string) {
    this.calculate();
    this.operator = nextOperator;
  }

  calculate() {
    if (!this.currentValue || !this.previousValue || !this.operator) return;

    const nextValue = evaluate(
      `${this.previousValue} ${CALC_OPERATOR_MAP[this.operator]} ${
        this.currentValue
      }`
    );

    this.displayValue = `${nextValue}`;
    this.currentValue = null;
    this.previousValue = this.displayValue;
    this.operator = null;
  }

  scrollToBottom() {
    const htmlDivElement = this.calculatorDisplayRef.nativeElement;
    htmlDivElement.scrollTop = htmlDivElement.scrollHeight;
  }
}
