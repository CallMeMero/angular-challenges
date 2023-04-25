import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  test('error modal is displayed if you click on "Confirm" without inputing a name', () => {
    cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });

    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('h1', 'Error');
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', () => {
    cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });

    cy.get('input').type('toto');

    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('h1', 'Profil');
    cy.get('mat-dialog-container').contains('Name: toto');

    cy.contains('button', 'Cancel').click();

    cy.contains('Name is invalid !!');
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', () => {
    cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });

    cy.get('input').type('toto');

    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('h1', 'Profil');
    cy.get('mat-dialog-container').contains('Name: toto');

    cy.contains('button', 'Confirmation').click();

    cy.contains('Name has been submitted');
  });
});
