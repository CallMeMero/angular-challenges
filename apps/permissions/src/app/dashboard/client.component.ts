import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoutComponent } from '../logout.component';

@Component({
  standalone: true,
  imports: [LogoutComponent],
  template: `
    <p>dashboard for Client works!</p>
    <app-logout>Logout</app-logout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDashboardComponent {}
