import { render, screen } from '@testing-library/react';
import App from './App';

test('renders OVERWATCH dashboard', () => {
  render(<App />);

  const title = screen.getByText(/OVERWATCH/i);

  expect(title).toBeInTheDocument();
});
