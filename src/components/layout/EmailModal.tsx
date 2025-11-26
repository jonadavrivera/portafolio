import { useEffect } from 'react';
import { useEmailModal } from '../../hooks/useEmailModal';
import { useLanguage as useLanguageContext } from '../../contexts/LanguageContext';

export default function EmailModal() {
  const {
    isOpen,
    copyFeedback,
    email,
    openModal,
    closeModal,
    copyEmail,
    sendEmail,
  } = useEmailModal();
  const { t } = useLanguageContext();

  useEffect(() => {
    const emailLink = document.getElementById('emailLink');
    const emailLinkMobile = document.getElementById('emailLinkMobile');
    const contactoNav = document.getElementById('contacto-nav');
    const contactoMobileNav = document.getElementById('contacto-mobile-nav');
    const contactMeButton = document.getElementById('contact-me-button');

    const handleClick = (e: Event) => {
      e.preventDefault();
      openModal();
    };

    if (emailLink) emailLink.addEventListener('click', handleClick);
    if (emailLinkMobile) emailLinkMobile.addEventListener('click', handleClick);
    if (contactoNav) contactoNav.addEventListener('click', handleClick);
    if (contactoMobileNav)
      contactoMobileNav.addEventListener('click', handleClick);
    if (contactMeButton)
      contactMeButton.addEventListener('click', handleClick);

    return () => {
      if (emailLink) emailLink.removeEventListener('click', handleClick);
      if (emailLinkMobile)
        emailLinkMobile.removeEventListener('click', handleClick);
      if (contactoNav) contactoNav.removeEventListener('click', handleClick);
      if (contactoMobileNav)
        contactoMobileNav.removeEventListener('click', handleClick);
      if (contactMeButton)
        contactMeButton.removeEventListener('click', handleClick);
    };
  }, [openModal]);

  if (!isOpen) return null;

  return (
    <div
      id="emailModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        id="modalOverlay"
        onClick={closeModal}
      ></div>

      <div
        id="modalContent"
        className="relative bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100"
      >
        <button
          id="closeModal"
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          aria-label={t('emailModal.close')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 dark:text-gray-400"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('emailModal.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('emailModal.subtitle')}
            </p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('emailModal.emailLabel')}
            </label>
            <div className="flex items-center gap-3">
              <span
                id="emailDisplay"
                className="text-lg font-mono text-gray-900 dark:text-white select-none pointer-events-none flex-1 break-all"
              >
                {email}
              </span>
              <button
                id="copyEmailBtn"
                onClick={copyEmail}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label={t('emailModal.copy')}
              >
                {copyFeedback ? (
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
                    className="text-green-600 dark:text-green-400"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
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
                    className="text-gray-600 dark:text-gray-400"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
            {copyFeedback && (
              <p
                id="copyFeedback"
                className="text-sm text-green-600 dark:text-green-400 mt-2"
              >
                {t('emailModal.copied')}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <button
              id="sendEmailBtn"
              onClick={sendEmail}
              className="w-full bg-[#ff9800] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#e68900] transition-colors flex items-center justify-center gap-2"
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
              {t('emailModal.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

