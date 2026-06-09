import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Operational Narrative section', () => {
  render(<App />);

  const title =
    screen.getByText(/Operational Narrative/i);

  expect(title).toBeInTheDocument();
});