import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const mockedPokemon = {
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
  summary: 'Closing both its eyes heightens all its other senses.',
};

describe('6. Teste o componente Pokemon.js', () => {
  describe('Deve ser renderizado um card com as informações do pokémon', () => {
    beforeEach(() => renderWithRouter(<Pokemon pokemon={ mockedPokemon } isFavorite />));

    it('Deve mostrar o nome correto do Pokémon na tela', () => {
      const pokemonName = screen.getByText(/Alakazam/i);

      expect(pokemonName).toBeInTheDocument();
    });

    it('Deve mostrar o tipo correto do Pokémon na tela', () => {
      const pokemonType = screen.getByText(/Psychic/i);

      expect(pokemonType).toBeInTheDocument();
    });

    it('Deve mostrar o peso médio do Pokémon na tela', () => {
      const pokemonWeight = screen.getByText(/Average weight: 48.0 kg/i);

      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight).toHaveTextContent(/Average weight: 48.0 kg/i);
    });

    it('Deve mostrar a imagem do Pokémon na tela, com alt text', () => {
      const pokemonImg = screen.getByAltText(/Alakazam sprite/i);

      expect(pokemonImg).toBeInTheDocument();
      expect(pokemonImg).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png'));
    });
  });

  describe('Deve ter um link que leve para a página de mais detalhes', () => {
    it('Deve ter um link de navegação para exibir detalhes do Pokémon', () => {
      renderWithRouter(<Pokemon pokemon={ mockedPokemon } isFavorite />);

      const link = screen.getByRole('link', { name: /More details/i });

      expect(link).toBeInTheDocument();
    });

    it('O link deve possuir a URL com a id do Pokémon', () => {
      renderWithRouter(<Pokemon pokemon={ mockedPokemon } isFavorite />);

      const link = screen.getByText(/More details/i);
      expect(link).toHaveAttribute('href', '/pokemons/65');
    });

    it('Deve redirecionar para a página de detalhes ao clicar no link', () => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ mockedPokemon } isFavorite />,
      );
      const link = screen.getByText(/More details/i);
      fireEvent.click(link);

      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/65');
    });
  });

  describe('Deve existir um ícone de estrela nos Pokémons favoritados', () => {
    beforeEach(() => renderWithRouter(<Pokemon pokemon={ mockedPokemon } isFavorite />));

    it('Deve ser uma imagem com o atributo src contendo o caminho especificado', () => {
      const bookmarkImg = screen.getByAltText(/Alakazam is marked/i);

      expect(bookmarkImg).toBeInTheDocument();
      expect(bookmarkImg).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
