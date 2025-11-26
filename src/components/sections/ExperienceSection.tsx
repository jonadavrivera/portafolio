import { useExperienceAnimation } from '../../hooks/useSectionAnimations';
import { useLanguage as useLanguageContext } from '../../contexts/LanguageContext';

export default function ExperienceSection() {
  const {
    experienciaTitleRef,
    experienciaCardRef,
    experienciaLeftRef,
    experienciaRightRef,
    experienciaFreelanceRef,
  } = useExperienceAnimation();
  const { t, tHtml } = useLanguageContext();

  return (
    <section
      id="experiencia"
      className="flex flex-col items-center justify-center px-6 relative mt-8"
    >
      {/* Punto de anclaje para scroll con offset - posicionado arriba del título */}
      <div id="experiencia-anchor" className="absolute top-0 -mt-24"></div>
      <h2
        id="experiencia-title"
        ref={experienciaTitleRef}
        className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto"
        aria-label="Experiencia laboral"
      >
        <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
          {t('experience.title')}
        </span>
        <span className="text-[#ff9800]">{t('experience.titleHighlight')}</span>
      </h2>
      <div
        id="experiencia-card"
        ref={experienciaCardRef}
        className="w-full border border-[rgba(189,189,189,0.22)] rounded-3xl p-8 md:p-12 backdrop-blur-[10px] 
        dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box]
        [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box]
        [animation:rotate_6s_linear_infinite]"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div
            id="experiencia-left"
            ref={experienciaLeftRef}
            className="flex-shrink-0 md:w-2/5 space-y-6 border-r-0 md:border-r border-[rgba(189,189,189,0.22)] pr-0 md:pr-8"
          >
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                {t('experience.position')}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#ff9800] mt-2 leading-tight">
                {t('experience.fullStack')}
              </h3>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                {t('experience.company')}
              </span>
              <p className="text-xl font-semibold dark:text-white text-black mt-2">
                {t('experience.contactoMedios')}
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                {t('experience.period')}
              </span>
              <div className="flex items-center gap-2 mt-2">
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
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Septiembre 2017 – Octubre 2025
                </p>
              </div>
            </div>
          </div>

          <div
            id="experiencia-right"
            ref={experienciaRightRef}
            className="flex-1 md:w-3/5 md:pl-6"
          >
                <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-500 font-semibold">
                  {t('experience.description')}
                </span>
                <div className="mt-4 space-y-4">
                <div className="mt-4 space-y-4">

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  {tHtml('experience.description1')}
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  {t('experience.description2')}
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  {tHtml('experience.description3')}
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCIA FREELANCE */}
      <div
        id="experiencia-freelance"
        ref={experienciaFreelanceRef}
        className="w-full border border-[rgba(189,189,189,0.22)] rounded-3xl p-8 md:p-12 backdrop-blur-[10px] mt-6
        dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box]
        [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box]
        [animation:rotate_6s_linear_infinite]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#ff9800] mb-3 leading-tight">
          {t('experience.freelance.title')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
          {t('experience.freelance.description')}
        </p>
      </div>
    </section>
  );
}
