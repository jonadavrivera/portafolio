import React from 'react';
import { useConclusionAnimation } from '../../hooks/useConclusionAnimation';
import { useEmailModal } from '../../hooks/useEmailModal';
import { useLanguage as useLanguageContext } from '../../contexts/LanguageContext';

export default function ConclusionSection() {
  const { conclusionTitleRef, conclusionTextRef, contactButtonRef } =
    useConclusionAnimation();
  const { openModal } = useEmailModal();
  const { t } = useLanguageContext();

  React.useEffect(() => {
    const contactButton = contactButtonRef.current;
    if (contactButton) {
      contactButton.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
      return () => {
        contactButton.removeEventListener('click', (e) => {
          e.preventDefault();
          openModal();
        });
      };
    }
  }, [openModal]);

  return (
    <section
      id="conclusion"
      className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <h2
        id="conclusion-title"
        ref={conclusionTitleRef}
        className="text-4xl font-bold text-[#ff9800] mb-6"
      >
        {t('conclusion.title')}
      </h2>
      <p
        id="conclusion-text"
        ref={conclusionTextRef}
        className="text-gray-400 max-w-3xl leading-relaxed"
      >
        {t('conclusion.text')}
        <br />
        {t('conclusion.text2')}
      </p>
      <button
        id="contact-me-button"
        ref={contactButtonRef}
        className="dark:bg-white dark:text-black bg-[#ff9800] text-white font-semibold px-6 py-3 rounded-3xl hover:bg-[#e68900] transition-colors flex items-center justify-center gap-2 mt-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        {t('conclusion.button')}
      </button>
    </section>
  );
}

