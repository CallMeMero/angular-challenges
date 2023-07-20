import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  inject,
} from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton$ | async">Top</button>
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'scroll-cd';
  cd = inject(ChangeDetectorRef);

  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(zone: NgZone) {
    this.displayButton$.subscribe(console.log);

    zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll').subscribe(() => {
        const pos = window.scrollY;
        const v = this.displayButtonSubject.value;
        this.displayButtonSubject.next(pos > 50);

        if (v !== this.displayButtonSubject.value) {
          this.cd.detectChanges();
        }
      });
    });
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
