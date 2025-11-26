import { useEffect, useState } from 'react';

export function useEmailModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const emailParts = ['jonadavidrivera', '@', 'gmail', '.', 'com'];

  const getEmail = () => {
    return emailParts.join('');
  };

  const openModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const copyEmail = async () => {
    const email = getEmail();
    try {
      await navigator.clipboard.writeText(email);
      setCopyFeedback(true);
      setTimeout(() => {
        setCopyFeedback(false);
      }, 2000);
    } catch (err) {
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyFeedback(true);
      setTimeout(() => {
        setCopyFeedback(false);
      }, 2000);
    }
  };

  const sendEmail = () => {
    const email = getEmail();
    
    // Plantilla para el asunto
    const subject = encodeURIComponent('Contacto desde Portafolio - Oportunidad de Colaboración');
    
    // Plantilla para el cuerpo del mensaje
    const body = encodeURIComponent(
      `Hola Jonathan,\n\n` +
      `Me pongo en contacto contigo a través de tu portafolio porque estoy interesado/a en:\n\n` +
      `[Describe aquí tu proyecto, oportunidad de colaboración o consulta]\n\n` +
      `Espero tu respuesta.\n\n` +
      `Saludos cordiales`
    );
    
    // Construir el enlace mailto con asunto y cuerpo
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    closeModal();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return {
    isOpen,
    copyFeedback,
    email: getEmail(),
    openModal,
    closeModal,
    copyEmail,
    sendEmail,
  };
}

