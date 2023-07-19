import { render, screen } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { ChildComponent } from './child.component';
import { HttpService } from './http.service';

describe('ChildComponent', () => {
  const setup = async () => {
    const httpServiceMock = createMockWithValues(HttpService, {
      sendTitle: jest.fn(),
    });

    await render(ChildComponent, {
      componentProviders: [
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    });
    return { httpServiceMock };
  };
  test('add Good title and send request title with no error', async () => {
    const { httpServiceMock } = await setup();

    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'TestTitle');
    await userEvent.click(button);

    expect(screen.queryByText('Title is required !!!')).not.toBeInTheDocument();
    expect(screen.getByText('Title is TestTitle')).toBeInTheDocument();

    expect(httpServiceMock.sendTitle).toHaveBeenCalledTimes(1);
  });

  test('fail validating title because no title were typed', async () => {
    const { httpServiceMock } = await setup();

    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    await userEvent.clear(input);
    await userEvent.click(button);

    expect(screen.queryByText('Title is required !!!')).toBeInTheDocument();

    expect(httpServiceMock.sendTitle).not.toHaveBeenCalled();
  });
});
