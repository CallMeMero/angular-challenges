import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { byRole } from 'testing-library-selector';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  const ui = {
    nav: byRole('link'),
    nameControl: byRole('textbox'),
    borrowBtn: byRole('button', { name: 'Borrow' }),
  };

  const setup = async () => {
    await render(AppComponent, {
      routes: appRoutes,
    });
    const user = userEvent.setup();
    return user;
  };

  it('shows error message and disabled button because no search criteria are typed', async () => {
    const user = await setup();

    fireEvent.click(ui.nav.get());

    await user.clear(ui.nameControl.get());

    expect(
      screen.queryByText('Search criteria is required!')
    ).toBeInTheDocument();
    expect(ui.borrowBtn.get()).toBeDisabled();

    await user.type(ui.nameControl.get(), 't');

    expect(
      screen.queryByText('Search criteria is required!')
    ).not.toBeInTheDocument();
    expect(ui.borrowBtn.get()).toBeEnabled();
  });

  it('shows No book found because no book match the search', async () => {
    await initSearch('sdklmfjksdlj');

    expect(
      screen.queryByText('No book found for this search')
    ).toBeInTheDocument();
  });

  it('shows One book because the search matches one book', async () => {
    await initSearch('kill');

    expect(
      screen.queryByText(/Book: To Kill a Mockingbird/i)
    ).toBeInTheDocument();
  });

  it('shows One book because the search matches one book even with different cases', async () => {
    await initSearch('KiLl');

    expect(
      screen.queryByText(/Book: To Kill a Mockingbird/i)
    ).toBeInTheDocument();
  });

  it('shows a list of books because the search matches multiples books', async () => {
    await initSearch('Tolkien');

    expect(screen.queryByText(/The Lord of the Rings/i)).toBeInTheDocument();
    expect(screen.queryByText(/The Hobbit/i)).toBeInTheDocument();
  });

  async function initSearch(search: string) {
    const user = await setup();

    fireEvent.click(ui.nav.get());

    await user.type(ui.nameControl.get(), search);

    fireEvent.click(ui.borrowBtn.get());
  }
});
