import { useWorkProcessAnimation } from '../../hooks/useWorkProcessAnimation';
import { useLanguage as useLanguageContext } from '../../contexts/LanguageContext';

export default function WorkProcess() {
  const {
    procesoTitleRef,
    card1Ref,
    card2Ref,
    card3Ref,
  } = useWorkProcessAnimation();
  const { t } = useLanguageContext();

  return (
    <section
      id="proceso-trabajo"
      className="w-full px-6 py-16 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título general de la sección */}
        <div className="mb-10 text-center">
          <h2
            id="proceso-trabajo-title"
            ref={procesoTitleRef}
            className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto"
            aria-label="Proceso de trabajo"
          >
            <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
              {t('workProcess.title')}
            </span>
            <span className="text-[#ff9800]">{t('workProcess.titleHighlight')}</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('workProcess.description')}
          </p>
        </div>

        {/* Tres columnas */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Columna 1: Cómo trabajo */}
          <div
            ref={card1Ref}
            className="border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 flex flex-col gap-3 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('workProcess.how.title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('workProcess.how.description')}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li><span>{t('workProcess.how.steps.analysis')}</span></li>
              <li><span>{t('workProcess.how.steps.design')}</span></li>
              <li><span>{t('workProcess.how.steps.solution')}</span></li>
              <li><span>{t('workProcess.how.steps.development')}</span></li>
              <li><span>{t('workProcess.how.steps.testing')}</span></li>
              <li><span>{t('workProcess.how.steps.deployment')}</span></li>
            </ul>
          </div>

          {/* Columna 2: Servicios */}
          <div
            ref={card2Ref}
            className="border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 flex flex-col gap-3 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('workProcess.services.title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('workProcess.services.description')}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li><span>{t('workProcess.services.items.web')}</span> </li>
              <li><span>{t('workProcess.services.items.mobile')}</span></li>
              <li><span>{t('workProcess.services.items.admin')}</span></li>
              <li><span>{t('workProcess.services.items.optimization')}</span></li>
              <li><span>{t('workProcess.services.items.automation')}</span></li>
              <li><span>{t('workProcess.services.items.maintenance')}</span></li>
            </ul>
          </div>

          {/* Columna 3: Mi enfoque */}
          <div
            ref={card3Ref}
            className="border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 flex flex-col gap-3 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('workProcess.approach.title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('workProcess.approach.description')}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li><span>{t('workProcess.approach.items.cleanCode')}</span></li>
              <li><span>{t('workProcess.approach.items.communication')}</span></li>
              <li><span>{t('workProcess.approach.items.delivery')}</span></li>
              <li><span>{t('workProcess.approach.items.documentation')}</span></li>
              <li><span>{t('workProcess.approach.items.scalability')}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

