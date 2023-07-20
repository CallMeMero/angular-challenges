import { createOutputSpy } from 'cypress/angular';
import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  it('using createOutputSpy', () => {
    cy.mount(CounterComponent, {
      componentProperties: {
        initialValue: 5,
        send: createOutputSpy<boolean>('sendSpy'),
      },
    });

    cy.get('[data-testid="counter"]').as('counter').should('contain', 5);

    cy.get('button').contains('Increment').click().click().click().click();

    cy.get('@counter').should('contain', 9);

    cy.get('button').contains('Send').click();

    cy.get('@sendSpy').should('have.been.calledOnce');
    cy.get('@sendSpy').should('have.been.calledWith', 9);

    cy.get('button').contains('Decrement').click().click();

    cy.get('button').contains('Send').click();

    cy.get('@sendSpy').should('have.been.calledTwice');
    cy.get('@sendSpy').should('have.been.calledWith', 7);
  });

  it('using autoSpyOutputs', () => {
    cy.mount(CounterComponent, {
      autoSpyOutputs: true,
      componentProperties: {
        initialValue: 5,
      },
    });

    cy.get('[data-testid="counter"]').as('counter').should('contain', 5);

    cy.get('button').contains('Increment').click().click().click().click();

    cy.get('@counter').should('contain', 9);

    cy.get('button').contains('Send').click();

    cy.get('@sendSpy').should('have.been.calledOnce');
    cy.get('@sendSpy').should('have.been.calledWith', 9);

    cy.get('button').contains('Decrement').click().click();

    cy.get('button').contains('Send').click();

    cy.get('@sendSpy').should('have.been.calledTwice');
    cy.get('@sendSpy').should('have.been.calledWith', 7);
  });
});
