import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoutComponent } from '../logout.component';

@Component({
  standalone: true,
  imports: [LogoutComponent],
  template: `
    <p>dashboard for Admin works!</p>
    <app-logout></app-logout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {}
