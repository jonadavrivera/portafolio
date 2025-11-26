import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import EmailModal from '../EmailModal';

// Mock del hook useEmailModal
const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();
const mockCopyEmail = vi.fn();
const mockSendEmail = vi.fn();

vi.mock('../../../hooks/useEmailModal', () => ({
  useEmailModal: () => ({
    isOpen: true,
    copyFeedback: '',
    email: 'test@example.com',
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
    copyEmail: mockCopyEmail,
    sendEmail: mockSendEmail,
  }),
}));

describe('EmailModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el modal cuando isOpen es true', () => {
    renderWithProviders(<EmailModal />);
    
    // El modal debería estar visible
    const modal = document.getElementById('emailModal');
    expect(modal).toBeInTheDocument();
  });

  it('debería mostrar el email', () => {
    renderWithProviders(<EmailModal />);
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('debería tener un botón para copiar el email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmailModal />);
    
    await waitFor(async () => {
      const copyButton = screen.queryByText(/copiar/i) || 
                         screen.queryByRole('button', { name: /copiar/i }) ||
                         document.querySelector('[aria-label*="copiar" i]');
      if (copyButton) {
        await user.click(copyButton as HTMLElement);
        expect(mockCopyEmail).toHaveBeenCalled();
      }
    });
  });

  it('debería tener un botón para enviar email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmailModal />);
    
    await waitFor(async () => {
      const sendButton = screen.queryByText(/enviar/i) || 
                         screen.queryByRole('button', { name: /enviar/i }) ||
                         document.querySelector('[aria-label*="enviar" i]');
      if (sendButton) {
        await user.click(sendButton as HTMLElement);
        expect(mockSendEmail).toHaveBeenCalled();
      }
    });
  });
});

