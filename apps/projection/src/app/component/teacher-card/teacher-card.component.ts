import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardComponent,
  ListItemTemplateDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers$ | async"
      (add)="onAddNewItem()"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template list-item-template let-teacher>
        <app-list-item
          [name]="teacher.firstname"
          (delete)="onDelete(teacher.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ListItemComponent,
    ListItemTemplateDirective,
    AsyncPipe,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddNewItem() {
    this.store.addOne(randTeacher());
  }
}
