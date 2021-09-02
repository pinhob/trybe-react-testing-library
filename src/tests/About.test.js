import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('2. Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('About Pokédex');
  });
});
