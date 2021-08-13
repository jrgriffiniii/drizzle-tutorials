import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the navbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Market Game/i);
  expect(linkElement).toBeInTheDocument();
});
