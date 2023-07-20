import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const initTestWithInput = async () => {
    const user = userEvent.setup();
    await render(AppComponent);

    const confirmControl = await screen.findByRole('button', {
      name: /confirm/i,
    });
    const inputControl = await screen.findByRole('textbox');

    await user.clear(inputControl);
    await user.type(inputControl, 'sebtest');

    await user.click(confirmControl);

    screen.getByRole('heading', { name: /Profil/i, level: 1 });
    screen.getByText('Name: sebtest');
  };

  test('error modal is displayed if you click on "Confirm" without inputing a name', async () => {
    const user = userEvent.setup();
    await render(AppComponent);

    const confirmControl = await screen.findByRole('button', {
      name: /confirm/i,
    });
    const inputControl = await screen.findByRole('textbox');

    await user.clear(inputControl);

    await user.click(confirmControl);

    const dialogControl = await screen.findByRole('dialog');

    expect(dialogControl).toBeInTheDocument();

    screen.getByRole('heading', { name: /error/i, level: 1 });
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
    await initTestWithInput();

    const cancelControl = await screen.findByRole('button', {
      name: /cancel/i,
    });

    await userEvent.click(cancelControl);

    screen.findByText('Name is invalid !!');
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
    await initTestWithInput();

    const confirmationControl = await screen.findByRole('button', {
      name: /confirm/i,
    });

    await userEvent.click(confirmationControl);

    screen.findByText('Name has been submitted');
  });
});
