import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../../../test/test-utils';
import ConclusionSection from '../ConclusionSection';

// Mock del hook useEmailModal
vi.mock('../../../hooks/useEmailModal', () => ({
  useEmailModal: () => ({
    openModal: vi.fn(),
  }),
}));

// Mock del hook de animaciones que usa GSAP
vi.mock('../../../hooks/useConclusionAnimation', () => ({
  useConclusionAnimation: () => ({
    conclusionTitleRef: { current: null },
    conclusionTextRef: { current: null },
    contactButtonRef: { current: null },
  }),
}));

describe('ConclusionSection', () => {
  it('debería renderizar el componente ConclusionSection', () => {
    renderWithProviders(<ConclusionSection />);
    
    const section = document.querySelector('section') || 
                    screen.queryByText(/construyendo/i);
    
    expect(section).toBeInTheDocument();
  });

  it('debería mostrar el título de la sección', () => {
    renderWithProviders(<ConclusionSection />);
    
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('debería tener un botón de contacto', () => {
    renderWithProviders(<ConclusionSection />);
    
    const button = screen.getByRole('button') || 
                   screen.queryByText(/contactar/i);
    
    expect(button).toBeInTheDocument();
  });
});

