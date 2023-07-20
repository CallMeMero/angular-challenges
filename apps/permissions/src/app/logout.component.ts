import { Component, inject } from '@angular/core';
import { UserStore } from './user.store';
import { ButtonComponent } from './button.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-logout',
  imports: [ButtonComponent],
  template: ` <button app-button (click)="logout()">Logout</button> `,
})
export class LogoutComponent {
  private userStore = inject(UserStore);
  private router = inject(Router);

  logout() {
    this.userStore.remove();

    this.router.navigate(['/']);
  }
}
