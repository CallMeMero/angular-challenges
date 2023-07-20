import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
describe('AppComponent', () => {
  const setup = async () => {
    await render(AppComponent, {
      routes: appRoutes,
    });
  };
  const initSearch = async (search: string) => {
    await setup();

    await userEvent.click(screen.getByRole('link', { name: /borrow a book/i }));

    const searchControl = screen.getByRole('textbox');
    await userEvent.type(searchControl, search);

    userEvent.click(screen.getByRole('button', { name: /borrow/i }));
  };

  it('shows error message and disabled button because no search criteria are typed', async () => {
    await setup();

    await userEvent.click(screen.getByRole('link', { name: /borrow a book/i }));

    const searchControl = screen.getByRole('textbox');
    await userEvent.clear(searchControl);

    expect(
      screen.queryByText('Search criteria is required!')
    ).toBeInTheDocument();

    const borrowBtn = screen.getByRole('button', { name: /borrow/i });
    expect(borrowBtn).toBeDisabled();

    await userEvent.type(searchControl, 't');

    expect(
      screen.queryByText('Search criteria is required!')
    ).not.toBeInTheDocument();
    expect(borrowBtn).toBeEnabled();
  });

  it('shows No book found because no book match the search', async () => {
    await initSearch('sdklmfjksdlj');

    await screen.findByText('No book found for this search');
  });

  it('shows One book because the search matches one book', async () => {
    await initSearch('To Kill');

    await screen.findByText(/Book: To Kill a Mockingbird/);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('shows One book because the search matches one book even with different cases', async () => {
    await initSearch('TO KILL');

    await screen.findByText(/Book: To Kill a Mockingbird/);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('shows a list of books because the search matches multiples books', async () => {
    await initSearch('THe');

    await screen.findByText(/Book: The Hunger Ga/);
    await screen.findByText(/Book: The Catcher in the/);
    await screen.findByText(/ook: The Great Gats/);
    await screen.findByText(/ Book: The Hobb/);
    await screen.findByText(/Book: The Lord of the Ring/);
    await screen.findByText(/Book: Harry Potter and the Philosopher's Ston/);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });
});
