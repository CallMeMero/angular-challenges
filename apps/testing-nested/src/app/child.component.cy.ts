import { TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';
import { HttpService } from './http.service';

describe(ChildComponent.name, () => {
  const setup = () => {
    cy.mount(ChildComponent).then(() => {
      const http = TestBed.inject(HttpService);
      cy.stub(http, 'sendTitle').as('http');
    });
  };

  test('add Good title and send request title with no error', () => {
    setup();

    cy.get("input[type='text']").type('Good');
    cy.get('button').click();

    cy.contains('Title is required !!!').should('not.exist');

    cy.get('@http').should('be.called');
  });

  test('fail validating title because no title were typed', () => {
    setup();

    cy.get('button').click();

    cy.contains('Title is required !!!');

    cy.get('@http').should('not.be.called');
  });
});
