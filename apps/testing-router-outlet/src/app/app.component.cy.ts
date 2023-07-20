import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent, {
      providers: [provideRouter(appRoutes)],
    });
    cy.get('nav a:first').click();
  };

  it('shows error message and disabled button because no search criteria are typed', () => {
    setup();

    cy.get('input[name=bookName]').as('bookControl').clear();
    cy.contains('Search criteria is required!');

    cy.get('@bookControl').type('kill');
    cy.contains('Search criteria is required!').should('not.exist');
  });

  it('shows No book found because no book match the search', () => {
    setup();

    cy.get('input[name=bookName]').as('bookControl').clear();
    cy.get('@bookControl').type('asdfasfasfdaf');
    cy.get('[data-cy="borrow-btn"]').click();

    cy.contains('No book found for this search');
  });

  it('shows One book because the search matches one book', () => {
    setup();

    cy.get('input[name=bookName]').as('bookControl').clear();
    cy.get('@bookControl').type('kill');
    cy.get('[data-cy="borrow-btn"]').click();

    cy.contains('Borrowed Book: To Kill a Mockingbird by Harper Lee');
    cy.get('li').should('have.length', 1);
  });

  it('shows One book because the search matches one book even with different cases', () => {
    setup();

    cy.get('input[name=bookName]').as('bookControl').clear();
    cy.get('@bookControl').type('TO KILL');
    cy.get('[data-cy="borrow-btn"]').click();

    cy.contains('Borrowed Book: To Kill a Mockingbird by Harper Lee');
    cy.get('li').should('have.length', 1);
  });

  it('shows a list of books because the search matches multiples books', () => {
    setup();

    cy.get('input[name=bookName]').as('bookControl').clear();
    cy.get('@bookControl').type('The');
    cy.get('[data-cy="borrow-btn"]').click();

    cy.contains('Book: The Hunger Ga');
    cy.contains('Book: The Catcher in the');
    cy.contains('ook: The Great Gats');
    cy.contains(' Book: The Hobb');
    cy.contains('Book: The Lord of the Ring');
    cy.contains("Book: Harry Potter and the Philosopher's Ston");

    cy.get('li').should('have.length', 6);
  });
});
