import React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

const isPokemonFavoriteById = (bool) => ({ 65: bool });

const changePokemonToFavorite = () => {
  isPokemonFavoriteById(false);
};

const match = { params: { id: '65' } };

const mockedPokemon = [
  {
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
  },
];

describe('7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById(true) }
        match={ match }
        pokemons={ mockedPokemon }
        onUpdateFavoritePokemons={ () => changePokemonToFavorite() }
      />,
    );
  });

  describe('Deve mostar as informações detalhadas do Pokémon', () => {
    it('Deve ter o texto {name} details', () => {
      const pokemonDetailsTitle = screen.getByText(/Alakazam details/i);

      expect(pokemonDetailsTitle).toBeInTheDocument();
    });

    it('Não deve existir o link More details', () => {
      const link = screen.queryByRole('link', { name: /More details/i }); // query para não dar erro, com base em: https://youtu.be/Yghw9FkNGsc

      expect(link).not.toBeInTheDocument();
    });

    it('Deve ter um heading com o texto Summary ', () => {
      const summaryHeader = screen.getByText(/Summary/i);

      expect(summaryHeader).toBeInTheDocument();
      expect(summaryHeader).toContainHTML('h2');
    });

    it('Deve ter uma seção com um resumo do Pokémon', () => {
      const summaryText = screen.getByText(/Closing both its eyes/i);

      expect(summaryText).toBeInTheDocument();
    });
  });

  describe('Deve ter uma seção com os mapas de localização do Pokémon', () => {
    it('Deve existir um heading Game Locations of {Pokemon}', () => {
      const locationHeader = screen.getByText(/Game Locations of Alakazam/i);

      expect(locationHeader).toBeInTheDocument();
      expect(locationHeader).toContainHTML('h2');
    });

    it('deve mostrar todas as localizações do Pokémon', () => {
      const locations = screen.getAllByAltText(/location/i);

      expect(locations).toBeTruthy();
      expect(locations[0]).toBeInTheDocument();
      expect(locations[1]).toBeUndefined();
    });

    it('Deve ter uma imagem com a url da localização', () => {
      const locationImg = screen.getByAltText(/location/i);

      expect(locationImg).toBeInTheDocument();
      expect(locationImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
    });

    it('Deve ter um alt text com o texto {Pokemon} location', () => {
      const imgAltTextWithPokemon = screen.getByAltText(/Alakazam location/i);

      expect(imgAltTextWithPokemon).toBeInTheDocument();
    });
  });

  describe('Deve conseguir favoritar um Pokémon', () => {
    it('Deve exibir um checkbox para favoritar o Pokémon', () => {
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
    });

    it('Deve colocar e tirar o pokémon dos favoritos ao clicar no checkbox', () => {
      cleanup(); // Não consegui fazer com o Pokémon mockado, então vou simular o fluxo normal de uso da aplicação sem ele
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByText(/More details/i);
      expect(moreDetailsLink).toBeInTheDocument();
      fireEvent.click(moreDetailsLink);

      const withoutFavoriteImg = screen.queryByAltText(/is marked as favorite/i);
      expect(withoutFavoriteImg).toBeNull();

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      const favoriteImg = screen.queryByAltText(/is marked as favorite/i);
      expect(favoriteImg).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(favoriteImg).not.toBeInTheDocument();
    });

    it('Deve ser "Pokémon favoritado?" o texto do checkbox', () => {
      const checkboxText = screen.getByText(/Pokémon favoritado/i);

      expect(checkboxText).toBeInTheDocument();
    });
  });
});
