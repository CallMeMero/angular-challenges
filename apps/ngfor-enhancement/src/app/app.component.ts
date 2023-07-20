import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmpty } from './ng-for-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEmpty],
  selector: 'app-root',
  template: `
    <button (click)="clear()">Clear</button>
    <button (click)="add()">Add</button>
    <div *ngForEmpty="let person of persons; else: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];

  public add() {
    this.persons.push({ name: `test ${this.persons.length + 1}` });
  }

  public clear() {
    this.persons = [];
  }
}
