import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('4. Teste o componente <NotFound.js />', () => {
  beforeEach(() => render(<NotFound />));

  it('Deve um heading h2 com o texto Page requested not found 😭', () => {
    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page requested not found 😭');
  });

  it('Deve ter uma imagem com a url https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const gifImg = screen.getByAltText(/pikachu crying/i);

    expect(gifImg).toBeInTheDocument();
    expect(gifImg).toHaveAttribute('src', expect.stringContaining('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'));
  });
});
