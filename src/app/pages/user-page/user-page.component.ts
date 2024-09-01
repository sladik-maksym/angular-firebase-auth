import { JsonPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  @Input() id: string | null = null;
  user = inject(AuthService).user!;
}
