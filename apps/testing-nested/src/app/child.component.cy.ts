import { TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';

describe(ChildComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ChildComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(ChildComponent);
  });
});
