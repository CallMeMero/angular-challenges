import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoutComponent } from '../logout.component';

@Component({
  standalone: true,
  imports: [LogoutComponent],
  template: `
    <p>dashboard for Everyone works!</p>
    <app-logout></app-logout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EveryoneDashboardComponent {}
