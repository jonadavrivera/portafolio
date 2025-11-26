import { useCareerAnimation } from '../../hooks/useSectionAnimations';

export default function CareerSection() {
  const {
    estudiosTitleRef,
    estudiosDescriptionRef,
    cardMaestriaRef,
    cardCertificadoRef,
    cardIngenieriaRef,
  } = useCareerAnimation();

  return (
    <section
      id="estudios"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <h2
        id="estudios-title"
        ref={estudiosTitleRef}
        className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto mt-12"
        aria-label="Formación académica"
      >
        <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
          Formación
        </span>
        <span className="text-[#ff9800]">académica</span>
      </h2>
      <p
        id="estudios-description"
        ref={estudiosDescriptionRef}
        className="text-gray-700 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
      >
        Mi trayectoria académica refleja mi compromiso con la excelencia y la
        innovación tecnológica
      </p>

      <div id="estudios-cards" className="w-full space-y-8">
        {/* Maestría */}
        <div
          id="card-maestria"
          ref={cardMaestriaRef}
          className="w-full border border-[rgba(189,189,189,0.22)] rounded-3xl p-8 md:p-12 backdrop-blur-[10px] 
          dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box]
          [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box]
          [animation:rotate_6s_linear_infinite]"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch relative">
            <div className="flex-shrink-0 md:w-2/5 space-y-6 text-center md:text-left relative pr-0 md:pr-8">
              <div className="absolute right-0 top-0 bottom-0 w-px bg-[rgba(189,189,189,0.22)] hidden md:block"></div>
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Período
                </span>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff9800]"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">2023 – 2024</p>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Universidad
                </span>
                <p className="text-xl font-bold text-[#ff9800] mt-2">UNIR México</p>
              </div>
            </div>

            <div className="absolute left-[calc(40%-2rem)] top-1/2 transform -translate-y-1/2 z-10 hidden md:flex">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff9800] to-[#ffc107] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center md:hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff9800] to-[#ffc107] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
            </div>

            <div className="flex-1 md:w-3/5 space-y-4 pl-0 md:pl-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Carrera
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mt-2 leading-tight">
                  Maestría en Dirección e Ingeniería en Sitios Web
                </h3>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Descripción
                </span>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg mt-2">
                  Desarrollo de competencias en liderazgo técnico, arquitectura digital, gestión de equipos y dirección de proyectos web de alto impacto.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificado */}
        <div
          id="card-certificado"
          ref={cardCertificadoRef}
          className="w-full border border-[rgba(189,189,189,0.22)] rounded-3xl p-8 md:p-12 backdrop-blur-[10px] 
          dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box]
          [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box]
          [animation:rotate_6s_linear_infinite]"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch relative">
            <div className="absolute left-[40%] top-0 bottom-0 w-px bg-[rgba(189,189,189,0.22)] hidden md:block"></div>

            <div className="flex-shrink-0 md:w-2/5 space-y-6 text-center md:text-left pr-0 md:pr-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Período
                </span>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff9800]"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">2024 – 2025</p>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Universidad
                </span>
                <p className="text-xl font-bold text-[#ff9800] mt-2">
                  MIU City University Miami
                </p>
              </div>
            </div>

            <div className="absolute left-[calc(40%-2rem)] top-1/2 transform -translate-y-1/2 z-10 hidden md:flex">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff9800] to-[#ffc107] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
                </svg>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center md:hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff9800] to-[#ffc107] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
                </svg>
              </div>
            </div>

            <div className="flex-1 md:w-3/5 space-y-4 pl-0 md:pl-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Carrera
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mt-2 leading-tight">
                  Certificado en Digital Project Management
                </h3>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Descripción
                </span>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg mt-2">
                Formación especializada en dirección de proyectos digitales, metodologías ágiles, definición de alcances y priorización estratégica.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingeniería */}
        <div
          id="card-ingenieria"
          ref={cardIngenieriaRef}
          className="w-full border border-[rgba(189,189,189,0.22)] rounded-3xl p-8 md:p-12 backdrop-blur-[10px] 
          dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box]
          [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box]
          [animation:rotate_6s_linear_infinite]"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch relative">
            <div className="flex-shrink-0 md:w-2/5 space-y-6 text-center md:text-left relative pr-0 md:pr-8">
              <div className="absolute right-0 top-0 bottom-0 w-px bg-[rgba(189,189,189,0.22)] hidden md:block"></div>
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Período
                </span>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff9800]"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">2013 – 2016</p>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Universidad
                </span>
                <p className="text-xl font-bold text-[#ff9800] mt-2">
                  Universidad Tres Culturas
                </p>
              </div>
            </div>

            <div className="absolute left-[calc(40%-2rem)] top-1/2 transform -translate-y-1/2 z-10 hidden md:flex">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff9800] to-[#ffc107] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center md:hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff9800] to-[#ffc107] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>

            <div className="flex-1 md:w-3/5 space-y-4 pl-0 md:pl-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Carrera
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mt-2 leading-tight">
                  Ingeniería en Sistemas Computacionales
                </h3>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  Descripción
                </span>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg mt-2">
                Formación base en desarrollo de software, bases de datos, análisis de sistemas y arquitectura.
                </p>
                <small className="text-gray-500 dark:text-gray-300 text-xs">
                  Reconocimiento por la actualización de la página web institucional.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
