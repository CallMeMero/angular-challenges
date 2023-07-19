import { TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';
import { HttpService } from './http.service';

describe(ChildComponent.name, () => {
  beforeEach(() => {
    cy.mount(ChildComponent).then(() => {
      const http = TestBed.inject(HttpService);
      cy.stub(http, 'sendTitle').as('http');
    });
  });

  test('add Good title and send request title with no error', () => {
    cy.get('input').clear();
    cy.get('input').type('TestTitle');

    cy.get('button').click();

    cy.get('p').contains('Title is TestTitle');

    cy.get('@http').should('be.calledOnce');
  });

  test('fail validating title because no title were typed', () => {
    cy.get('button').click();

    cy.contains('Title is required !!!');

    cy.get('@http').should('not.be.called');
  });
});
