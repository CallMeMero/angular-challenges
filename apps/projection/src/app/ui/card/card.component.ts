import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Entity } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({ selector: '[list-item-template]', standalone: true })
export class ListItemTemplateDirective {}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
    `
      :host {
        @apply border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: Entity[] | null = [];
  @Output() add = new EventEmitter<void>();

  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  listItemTemplate!: TemplateRef<ListItemComponent>;

  addNewItem() {
    this.add.emit();
  }

  id(index: number, item: Entity) {
    return item.id;
  }
}
