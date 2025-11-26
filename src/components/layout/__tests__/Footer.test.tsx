import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../../test/test-utils';
import Footer from '../Footer';

describe('Footer', () => {
  it('debería renderizar el componente Footer', () => {
    renderWithProviders(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('debería mostrar el año actual', () => {
    renderWithProviders(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('debería mostrar el nombre "Jonathan Rivera"', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText('Jonathan Rivera')).toBeInTheDocument();
  });

  it('debería mostrar los logos', () => {
    renderWithProviders(<Footer />);
    const logos = screen.getAllByAltText('Jonathan Rivera Logo');
    expect(logos.length).toBeGreaterThan(0);
  });
});


