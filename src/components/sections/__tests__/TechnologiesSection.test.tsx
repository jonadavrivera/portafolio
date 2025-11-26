import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../../../test/test-utils';
import TechnologiesSection from '../TechnologiesSection';

// Mock del hook de animaciones que usa GSAP
vi.mock('../../../hooks/useTechnologiesAnimation', () => ({
  useTechnologiesAnimation: () => ({
    tecnologiasTitleRef: { current: null },
    tecnologiasContainerRef: { current: null },
  }),
}));

describe('TechnologiesSection', () => {
  it('debería renderizar el componente TechnologiesSection', () => {
    renderWithProviders(<TechnologiesSection />);
    
    const section = document.querySelector('#tecnologias') ||
                    screen.queryByText(/tecnologías/i);
    
    expect(section).toBeInTheDocument();
  });

  it('debería mostrar el título de la sección', () => {
    renderWithProviders(<TechnologiesSection />);
    
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
  });
});

