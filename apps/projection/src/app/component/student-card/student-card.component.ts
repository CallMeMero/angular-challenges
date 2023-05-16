import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import {
  CardComponent,
  ListItemTemplateDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students$ | async"
      (add)="onAddNewItem()"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template list-item-template let-student>
        <app-list-item
          [name]="student.firstname"
          (delete)="onDelete(student.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    ListItemComponent,
    ListItemTemplateDirective,
    AsyncPipe,
  ],
})
export class StudentCardComponent implements OnInit {
  students$ = this.store.students$;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddNewItem() {
    this.store.addOne(randStudent());
  }
}
