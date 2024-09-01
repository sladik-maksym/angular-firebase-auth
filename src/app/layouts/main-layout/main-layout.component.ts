import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NgClass, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  collapsed = true;
}
