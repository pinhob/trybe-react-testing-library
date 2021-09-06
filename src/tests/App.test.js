import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const nav = screen.getByRole('navigation');
    const firstLink = screen.getByRole('link', { name: /Home/i });
    const secondLink = screen.getByRole('link', { name: /About/i });
    const thirdLink = screen.getByRole('link', { name: /Favorite/i });

    expect(nav).toBeInTheDocument();
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });
});
