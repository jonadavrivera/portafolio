import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../../../test/test-utils';
import ExperienceSection from '../ExperienceSection';

// Mock del hook de animaciones
vi.mock('../../../hooks/useSectionAnimations', () => ({
  useExperienceAnimation: () => ({
    experienciaTitleRef: { current: null },
    experienciaCardRef: { current: null },
    experienciaLeftRef: { current: null },
    experienciaRightRef: { current: null },
    experienciaFreelanceRef: { current: null },
  }),
}));

describe('ExperienceSection', () => {
  it('debería renderizar el componente ExperienceSection', () => {
    renderWithProviders(<ExperienceSection />);
    
    const section = document.querySelector('#experiencia') ||
                    screen.getByLabelText(/experiencia/i);
    
    expect(section).toBeInTheDocument();
  });

  it('debería mostrar el título de la sección', () => {
    renderWithProviders(<ExperienceSection />);
    
    // El título debería estar presente (puede estar en español o inglés)
    const title = screen.getByRole('heading', { level: 2 }) || 
                  screen.getByLabelText(/experiencia/i);
    
    expect(title).toBeInTheDocument();
  });
});

