import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SimplePurePipe } from './simple-pure.pipe';

@Component({
  standalone: true,
  imports: [NgFor, SimplePurePipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | simplePure : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
