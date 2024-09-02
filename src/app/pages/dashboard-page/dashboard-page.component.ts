import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';
import { CalculatorComponent } from './shared/components/calculator/calculator.component';
 

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ThemeSwitcherComponent, CalculatorComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
