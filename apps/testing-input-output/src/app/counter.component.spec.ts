import { fireEvent, render, screen } from '@testing-library/angular';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  test('set input and listen to output', async () => {
    const mockSend = jest.fn();

    await render(CounterComponent, {
      componentInputs: {
        initialValue: 10,
      },
      componentOutputs: {
        send: {
          emit: mockSend,
        } as any,
      },
    });

    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    const sendButton = screen.getByRole('button', { name: /send/i });
    const counterValue = screen.getByTestId('counter');

    expect(counterValue).toHaveTextContent('10');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent('15');

    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);
    expect(counterValue).toHaveTextContent('13');

    fireEvent.click(sendButton);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(13);
  });
});
