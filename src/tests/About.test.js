import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('2. Teste o componente <About.js />', () => {
  beforeEach(() => render(<About />));

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const firstParagraph = screen.getByText(/This application/i);
    const secondParagraph = screen.getByText(/One can/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
  });
});
