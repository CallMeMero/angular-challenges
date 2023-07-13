/* eslint-disable @angular-eslint/directive-selector */
import { NgIf, NgIfContext } from '@angular/common';
import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';
import { ComponentStore } from '@ngrx/component-store';
import { pipe, tap } from 'rxjs';

@Directive({
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  hostDirectives: [NgIf],
  providers: [ComponentStore],
})
export class HasRoleDirective {
  private store = inject(UserStore);
  private componentStore = inject(ComponentStore);
  private ngIf = inject(NgIf, { host: true });

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.showTemplate(this.store.hasAnyRole(role));
    }
  }

  @Input('hasRoleIsAdmin') set isAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.showTemplate(this.store.isAdmin$);
    }
  }

  private readonly showTemplate = this.componentStore.effect<
    boolean | undefined
  >(pipe(tap((show) => (this.ngIf.ngIf = show))));
}
