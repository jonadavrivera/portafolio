import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../layout/Header';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { AppProvider } from '../../contexts/AppContext';

// Mock de los hooks que Header usa
vi.mock('../../hooks/useHeaderAnimation', () => ({
  useHeaderAnimation: () => ({
    headerRef: { current: null },
    headerLogoRef: { current: null },
    headerNavRef: { current: null },
    headerRightRef: { current: null },
    expandHeader: vi.fn(),
  }),
}));

vi.mock('../../hooks/useHeaderShrink', () => ({
  useHeaderShrink: () => {},
}));

vi.mock('../../hooks/useMobileMenu', () => ({
  useMobileMenu: () => ({
    menuButtonRef: { current: null },
    menuRef: { current: null },
  }),
}));

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    toggleTheme: vi.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          {ui}
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('debería renderizar el componente Header', () => {
    renderWithProviders(<Header loaderComplete={true} />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('debería mostrar los enlaces de navegación', () => {
    renderWithProviders(<Header loaderComplete={true} />);
    // Usar getAllByText porque los enlaces aparecen tanto en el menú desktop como en el móvil
    const inicioLinks = screen.getAllByText(/inicio/i);
    const experienciaLinks = screen.getAllByText(/experiencia/i);
    const proyectosLinks = screen.getAllByText(/proyectos/i);
    const contactoLinks = screen.getAllByText(/contacto/i);
    
    expect(inicioLinks.length).toBeGreaterThan(0);
    expect(experienciaLinks.length).toBeGreaterThan(0);
    expect(proyectosLinks.length).toBeGreaterThan(0);
    expect(contactoLinks.length).toBeGreaterThan(0);
  });
});

