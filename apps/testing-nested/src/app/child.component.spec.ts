import { fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { ChildComponent } from './child.component';
import { HttpService } from './http.service';
describe('ChildComponent', () => {
  const setup = async () => {
    const httpService = createMock(HttpService);
    httpService.sendTitle = jest.fn();

    await render(ChildComponent, {
      componentProviders: [
        {
          provide: HttpService,
          useValue: httpService,
        },
      ],
    });
    const user = userEvent.setup();
    return { user, httpService };
  };

  test('add Good title and send request title with no error', async () => {
    const { user, httpService } = await setup();

    const validateButton = screen.getByRole('button', { name: /validate/i });
    const input = screen.getByRole('textbox');

    expect(input).toHaveTextContent('');

    await user.type(input, 'Good');

    expect(screen.queryByText('Title is Good')).toBeInTheDocument();

    fireEvent.click(validateButton);

    expect(screen.queryByText('Title is required !!!')).not.toBeInTheDocument();
    expect(httpService.sendTitle).toHaveBeenCalledTimes(1);
  });

  test('fail validating title because no title were typed', async () => {
    const { httpService } = await setup();

    const validateButton = screen.getByRole('button', { name: /validate/i });

    expect(screen.queryByText('Title is')).toBeInTheDocument();

    fireEvent.click(validateButton);

    expect(screen.queryByText('Title is required !!!')).toBeInTheDocument();
    expect(httpService.sendTitle).not.toHaveBeenCalled();
  });
});
