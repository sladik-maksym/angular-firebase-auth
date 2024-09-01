import { Component } from '@angular/core';
import { CalculatorComponent } from '../../components/calculator/calculator.component';
import { ThemeSwitcherComponent } from '../../components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ThemeSwitcherComponent, CalculatorComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
