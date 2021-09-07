import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

const mockedPokemons = [
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
  },
];

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('deve exibir na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokemonsMessage = screen.getByText(/No favorite pokemon found/i);
    expect(noPokemonsMessage).toBeInTheDocument();
  });

  it('deve exibir todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockedPokemons } />);

    const alakazamCard = screen.getByText(/Alakazam/i);
    const snorlaxCard = screen.getByText(/Snorlax/i);

    expect(alakazamCard).toBeInTheDocument();
    expect(snorlaxCard).toBeInTheDocument();
  });
});
