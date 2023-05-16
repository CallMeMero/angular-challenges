import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import {
  CardComponent,
  ListItemTemplateDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="cities$ | async"
    (add)="onAddNewItem()"
    class="bg-light-blue">
    <img src="assets/img/city.png" width="200px" />
    <ng-template list-item-template let-city>
      <app-list-item
        [name]="city.name"
        (delete)="onDelete(city.id)"></app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
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
export class CityCardComponent implements OnInit {
  cities$ = this.store.cities$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddNewItem() {
    this.store.addOne(randomCity());
  }
}
