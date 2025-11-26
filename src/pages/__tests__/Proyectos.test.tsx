import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import Proyectos from '../Proyectos';

// Mock de los hooks
vi.mock('../../hooks/useProjectModal', () => ({
  useProjectModal: () => ({
    isOpen: false,
    selectedProject: null,
    openModal: vi.fn(),
    closeModal: vi.fn(),
    goToNext: vi.fn(),
    goToPrevious: vi.fn(),
    canGoNext: false,
    canGoPrevious: false,
  }),
  getProjectText: (text: string | { es: string; en: string } | undefined, language: 'es' | 'en') => {
    if (typeof text === 'object' && text !== null) {
      return text[language] || '';
    }
    return text || '';
  },
}));

vi.mock('../../hooks/useProjectsPageAnimation', () => ({
  useProjectsPageAnimation: () => ({
    titleRef: { current: null },
    descriptionRef: { current: null },
    projectsContainerRef: { current: null },
  }),
}));

vi.mock('../../components/layout/Header', () => ({
  default: ({ loaderComplete }: { loaderComplete: boolean }) => (
    <header data-testid="header" data-loader-complete={loaderComplete}>
      Header
    </header>
  ),
}));

vi.mock('../../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('../../components/layout/EmailModal', () => ({
  default: () => <div data-testid="email-modal">EmailModal</div>,
}));

vi.mock('../../components/layout/ProjectModal', () => ({
  default: () => <div data-testid="project-modal">ProjectModal</div>,
}));

vi.mock('../../utils/imageLoader', () => ({
  getImageUrl: (path: string) => path,
}));

// Mock de projects.json
vi.mock('../../data/projects.json', () => ({
  default: {
    featured: [
      {
        id: '1',
        title: { es: 'Proyecto 1', en: 'Project 1' },
        category: { es: 'Web', en: 'Web' },
        shortDescription: { es: 'Descripción corta', en: 'Short description' },
        previewImage: 'image1.jpg',
        technologies: ['React', 'TypeScript'],
        startDate: '2024-01',
        endDate: '2024-02',
      },
    ],
    all: [
      {
        id: '2',
        title: { es: 'Proyecto 2', en: 'Project 2' },
        category: { es: 'Mobile', en: 'Mobile' },
        shortDescription: { es: 'Descripción corta 2', en: 'Short description 2' },
        previewImage: 'image2.jpg',
        technologies: ['React Native'],
        startDate: '2024-03',
        endDate: '2024-04',
      },
    ],
  },
}));

describe('Proyectos', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock de window.expandHeader
    (window as any).expandHeader = vi.fn();
  });

  afterEach(() => {
    delete (window as any).expandHeader;
  });

  it('debería renderizar el componente Proyectos', () => {
    renderWithProviders(<Proyectos />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('debería mostrar el título de la página', async () => {
    renderWithProviders(<Proyectos />);
    
    await waitFor(() => {
      // El título debería estar presente (puede estar en español o inglés)
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();
    });
  });

  it('debería mostrar los filtros de categorías', async () => {
    renderWithProviders(<Proyectos />);
    
    await waitFor(() => {
      // Debería haber botones de filtro
      const filterButtons = screen.getAllByRole('button');
      expect(filterButtons.length).toBeGreaterThan(0);
    });
  });

  it('debería mostrar los proyectos', async () => {
    renderWithProviders(<Proyectos />);
    
    await waitFor(() => {
      // Debería haber al menos un proyecto renderizado
      const projectCards = screen.queryAllByRole('article');
      expect(projectCards.length).toBeGreaterThan(0);
    });
  });

  it('debería renderizar Footer y EmailModal', () => {
    renderWithProviders(<Proyectos />);
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('email-modal')).toBeInTheDocument();
  });

  it('debería cambiar el filtro al hacer click en un botón de categoría', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Proyectos />);
    
    await waitFor(async () => {
      const filterButtons = screen.getAllByRole('button');
      if (filterButtons.length > 1) {
        // Hacer click en el segundo botón (probablemente una categoría)
        await user.click(filterButtons[1]);
        // El filtro debería cambiar
        expect(filterButtons[1]).toHaveClass('bg-[#ff9800]');
      }
    });
  });
});

