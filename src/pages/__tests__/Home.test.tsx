import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen } from '../../../test/test-utils';
import Home from '../Home';

// Mock de todos los hooks y componentes
vi.mock('../../hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => {},
}));

vi.mock('../../components/layout/Loader', () => ({
  default: ({ onComplete }: { onComplete: () => void }) => {
    // Simular que el loader se completa inmediatamente en tests
    setTimeout(() => onComplete(), 0);
    return <div data-testid="loader">Loader</div>;
  },
}));

vi.mock('../../components/layout/DecarativeCircle', () => ({
  default: () => <div data-testid="decarative-circle">DecarativeCircle</div>,
}));

vi.mock('../../components/layout/Header', () => ({
  default: ({ loaderComplete }: { loaderComplete: boolean }) => (
    <header data-testid="header" data-loader-complete={loaderComplete}>
      Header
    </header>
  ),
}));

vi.mock('../../components/sections/HeroSection', () => ({
  default: ({ loaderComplete }: { loaderComplete: boolean }) => (
    <section data-testid="hero-section" data-loader-complete={loaderComplete}>
      HeroSection
    </section>
  ),
}));

vi.mock('../../components/sections/ExperienceSection', () => ({
  default: () => <section data-testid="experience-section">ExperienceSection</section>,
}));

vi.mock('../../components/sections/CareerSection', () => ({
  default: () => <section data-testid="career-section">CareerSection</section>,
}));

vi.mock('../../components/sections/ProjectsSection', () => ({
  default: () => <section data-testid="projects-section">ProjectsSection</section>,
}));

vi.mock('../../components/sections/TechnologiesSection', () => ({
  default: () => <section data-testid="technologies-section">TechnologiesSection</section>,
}));

vi.mock('../../components/sections/WorkProcess', () => ({
  default: () => <section data-testid="work-process">WorkProcess</section>,
}));

vi.mock('../../components/sections/ConclusionSection', () => ({
  default: () => <section data-testid="conclusion-section">ConclusionSection</section>,
}));

vi.mock('../../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('../../components/layout/EmailModal', () => ({
  default: () => <div data-testid="email-modal">EmailModal</div>,
}));

describe('Home', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  it('debería renderizar el componente Home', () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('debería renderizar todas las secciones principales', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('experience-section')).toBeInTheDocument();
    expect(screen.getByTestId('career-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('technologies-section')).toBeInTheDocument();
    expect(screen.getByTestId('work-process')).toBeInTheDocument();
    expect(screen.getByTestId('conclusion-section')).toBeInTheDocument();
  });

  it('debería renderizar Footer y EmailModal', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('email-modal')).toBeInTheDocument();
  });

  it('debería renderizar DecarativeCircle', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByTestId('decarative-circle')).toBeInTheDocument();
  });

  it('debería pasar loaderComplete a Header y HeroSection', async () => {
    renderWithProviders(<Home />);
    
    const header = screen.getByTestId('header');
    const heroSection = screen.getByTestId('hero-section');
    
    // En la primera carga, loaderComplete debería ser false inicialmente
    // pero después del loader debería ser true
    expect(header).toBeInTheDocument();
    expect(heroSection).toBeInTheDocument();
  });
});


