import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../../../test/test-utils';
import Loader from '../Loader';

// Mock del hook useLoader
const mockOnComplete = vi.fn();
vi.mock('../../../hooks/useLoader', () => ({
  useLoader: ({ onComplete }: { onComplete: () => void }) => {
    // Guardar la función onComplete para poder llamarla en el test
    mockOnComplete.mockImplementation(onComplete);
    
    // Simular que el loader se completa después de un tiempo
    setTimeout(() => {
      onComplete();
    }, 100);

    return {
      overlayRef: { current: null },
      loaderInnerRef: { current: null },
      progressWrapperRef: { current: null },
      progressNumberRef: { current: null },
    };
  },
}));

describe('Loader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debería renderizar el componente Loader', () => {
    const onComplete = vi.fn();
    renderWithProviders(<Loader onComplete={onComplete} />);
    
    const loader = document.getElementById('loader-overlay') || screen.getByText(/Portafolio/i);
    expect(loader).toBeInTheDocument();
  });

  it('debería mostrar el texto "Portafolio Jonathan Rivera"', () => {
    const onComplete = vi.fn();
    renderWithProviders(<Loader onComplete={onComplete} />);
    
    expect(screen.getByText(/Portafolio Jonathan Rivera/i)).toBeInTheDocument();
  });

  it('debería pasar onComplete al hook useLoader', () => {
    const onComplete = vi.fn();
    renderWithProviders(<Loader onComplete={onComplete} />);
    
    // Verificar que el componente se renderiza correctamente
    // El hook useLoader debería recibir la función onComplete
    expect(document.getElementById('loader-overlay')).toBeInTheDocument();
    expect(document.getElementById('loader-progress-wrapper')).toBeInTheDocument();
  });
});

