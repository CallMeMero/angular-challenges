import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  test('set input and listen to output', async () => {
    const sendValue = jest.fn();
    const user = userEvent.setup();

    await render(CounterComponent, {
      componentInputs: {
        initialValue: 5,
      },
      componentOutputs: {
        send: {
          emit: sendValue,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      },
    });

    const incrementControl = screen.getByRole('button', { name: /increment/i });
    const decrementControl = screen.getByRole('button', { name: /decrement/i });
    const sendControl = screen.getByRole('button', { name: /send/i });
    const valueControl = screen.getByTestId('counter');

    expect(valueControl).toHaveTextContent('5');

    await user.click(incrementControl);
    await user.click(incrementControl);
    await user.click(incrementControl);
    await user.click(incrementControl);
    expect(valueControl).toHaveTextContent('9');

    await user.click(sendControl);
    expect(sendValue).toHaveBeenCalledTimes(1);
    expect(sendValue).toHaveBeenCalledWith(9);

    await user.click(decrementControl);
    await user.click(decrementControl);
    expect(valueControl).toHaveTextContent('7');

    await user.click(sendControl);
    expect(sendValue).toHaveBeenCalledTimes(2);
    expect(sendValue).toHaveBeenCalledWith(7);
  });
});
