import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });
  };

  test('error modal is displayed if you click on "Confirm" without inputing a name', () => {
    setup();

    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('h1', 'Error');
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', () => {
    setup();

    cy.get('input').type('test');

    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('h1', 'Profil');
    cy.get('mat-dialog-container').contains('Name: test');

    cy.contains('button', 'Cancel').click();

    cy.contains('Name is invalid !!');
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', () => {
    setup();

    cy.get('input').type('test');

    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('h1', 'Profil');
    cy.get('mat-dialog-container').contains('Name: test');

    cy.contains('button', 'Confirmation').click();

    cy.contains('Name has been submitted');
  });
});
