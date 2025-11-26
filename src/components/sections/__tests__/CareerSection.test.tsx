import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../../../test/test-utils';
import CareerSection from '../CareerSection';

// Mock del hook de animaciones
vi.mock('../../../hooks/useSectionAnimations', () => ({
  useCareerAnimation: () => ({
    estudiosTitleRef: { current: null },
    estudiosDescriptionRef: { current: null },
    cardMaestriaRef: { current: null },
    cardCertificadoRef: { current: null },
    cardIngenieriaRef: { current: null },
  }),
}));

describe('CareerSection', () => {
  it('debería renderizar el componente CareerSection', () => {
    renderWithProviders(<CareerSection />);
    
    const section = document.querySelector('#estudios') ||
                    screen.getByLabelText(/formación/i);
    
    expect(section).toBeInTheDocument();
  });

  it('debería mostrar el título de la sección', () => {
    renderWithProviders(<CareerSection />);
    
    const title = screen.getByRole('heading', { level: 2 }) || 
                  screen.getByLabelText(/formación/i);
    
    expect(title).toBeInTheDocument();
  });
});

