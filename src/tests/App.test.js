import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it('O topo da aplicação deve conter um conjunto fixo de links de navegação', () => {
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

  it('Deve redirecionar para a página inicial quando clicado em Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeButton = screen.getByText(/Home/i);
    const { pathname } = history.location;

    fireEvent.click(homeButton);
    expect(pathname).toBe('/');
  });

  it('Deve redirecionar para a página About quando clicado em About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutButton = screen.getByText(/About/i);
    fireEvent.click(aboutButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
});
