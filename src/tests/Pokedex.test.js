import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('5. Teste o componente <Pokedex.js />', () => {
  describe('Deve exibir o próximo Pokémon quando tal botão é clicado', () => {
    it('Deve contar o texto Próximo pokémon no botão', () => {
      const buttonNextPokemon = screen.getByText(/Próximo pokémon/i);
      expect(buttonNextPokemon).toBeInTheDocument();
      expect(buttonNextPokemon).toContainHTML('button');
    });

    it('Deve mostrar o próximo Pokémon sempre que o botão é clicado', () => {
      const buttonNextPokemon = screen.getByText(/Próximo pokémon/i);

      const pokemonOnScreen = () => screen.getByTestId('pokemon-name');

      // Refatorar essa coisa feia depois com algum loop
      expect(pokemonOnScreen()).toHaveTextContent(/Pikachu/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Charmander/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Caterpie/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Ekans/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Alakazam/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Mew/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Rapidash/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Snorlax/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Dragonair/i);
      fireEvent.click(buttonNextPokemon);
      expect(pokemonOnScreen()).toHaveTextContent(/Pikachu/i);
    });
  });

  describe('Deve ter botões de filtro', () => {
    it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
      const seven = 7;
      const allButtons = screen.getAllByTestId('pokemon-type-button');
      const buttonElectricType = screen.getByRole('button', { name: /Electric/i });
      const buttonFireType = screen.getByRole('button', { name: /Fire/i });
      const buttonBugType = screen.getByRole('button', { name: /Bug/i });
      const buttonPoisonType = screen.getByRole('button', { name: /Poison/i });
      const buttonPsychicType = screen.getByRole('button', { name: /Psychic/i });
      const buttonNormalType = screen.getByRole('button', { name: /Normal/i });
      const buttonDragonType = screen.getByRole('button', { name: /Dragon/i });

      expect(buttonElectricType).toBeInTheDocument();
      expect(buttonFireType).toBeInTheDocument();
      expect(buttonBugType).toBeInTheDocument();
      expect(buttonPoisonType).toBeInTheDocument();
      expect(buttonPsychicType).toBeInTheDocument();
      expect(buttonNormalType).toBeInTheDocument();
      expect(buttonDragonType).toBeInTheDocument();
      expect(allButtons.length).toBe(seven);
    });

    it('Deve exibir só os Pokémons do tipo filtrado', () => {
      const psychicTypeButton = screen.getByRole('button', { name: /Psychic/i });
      const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });

      fireEvent.click(psychicTypeButton);

      const firstPsychicPokemon = screen.getByText(/Alakazam/i);
      expect(firstPsychicPokemon).toBeInTheDocument();

      fireEvent.click(nextPokemonButton);

      const secondPsychicPokemon = screen.getByText(/Mew/i);
      expect(secondPsychicPokemon).toBeInTheDocument();
    });

    it('Deve estar sempre visível o botão All', () => {
      const allButton = screen.getByRole('button', { name: /All/i });

      expect(allButton).toBeInTheDocument();
      expect(allButton).toBeVisible();
    });
  });

  it('Deve conter o heading Encountered pokémons', () => {
    const header = screen.getByText(/Encountered pokémons/i);

    expect(header).toBeInTheDocument();
    expect(header).toContainHTML('h2');
  });

  it('Deve mostrar apenas um Pokémon por vez', () => {
    const firstPokemon = screen.getByText(pokemons[0].name);
    const secondPokemon = screen.queryByText(pokemons[1].name);

    expect(firstPokemon).toBeInTheDocument();
    expect(secondPokemon).not.toBeInTheDocument();
    expect(secondPokemon).toBeNull();
  });

  it('Deve resetar os filtros quando clicar no botão All', () => {
    const allButton = screen.getByRole('button', { name: /All/i });

    fireEvent.click(allButton);

    const firstPokemonOfAll = screen.getByText(/Pikachu/i);

    expect(allButton).toBeInTheDocument();
    expect(firstPokemonOfAll).toBeInTheDocument();
  });
});
