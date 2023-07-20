import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  template: ` <h1 mat-dialog-title>Show all Topics</h1>
    <div mat-dialog-content>
      <ng-container *ngrxLet="data.topics$ as topics; suspenseTpl: loading">
        <ul>
          <li *ngFor="let topic of topics">
            {{ topic }}
          </li>
        </ul>
      </ng-container>
    </div>
    <ng-template #loading>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>`,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgFor,
    NgIf,
    LetDirective,
    MatProgressBarModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicModalComponent {
  data = inject(MAT_DIALOG_DATA);
}
