import { useProjectsAnimation } from '../../hooks/useProjectsAnimation';
import { useProjectModal } from '../../hooks/useProjectModal';
import type { Project } from '../../hooks/useProjectModal';
import { getProjectText } from '../../hooks/useProjectModal';
import ProjectModal from '../layout/ProjectModal';
import projectsData from '../../data/projects.json';
import { getImageUrl } from '../../utils/imageLoader';
import { useLanguage as useLanguageContext } from '../../contexts/LanguageContext';

export default function ProjectsSection() {
  const { proyectosSectionRef } = useProjectsAnimation();
  const { t, language } = useLanguageContext();
  const {
    isOpen,
    selectedProject,
    openModal,
    closeModal,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
  } = useProjectModal();
  const featuredProjects = projectsData.featured as Project[];

  const handleProjectClick = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    openModal(project, featuredProjects);
  };

  const renderProjectCard = (project: Project, isMobile: boolean = false) => {
    const cardClass = isMobile
      ? 'project-card-mobile bg-gradient-to-br from-[#ff9800] to-[#ffc107] text-white rounded-3xl p-6 flex flex-col shadow-2xl origin-center w-full aspect-[3/4] max-w-sm mx-auto'
      : 'project-card flex-shrink-0 bg-gradient-to-br from-[#ff9800] to-[#ffc107] text-white rounded-3xl p-6 flex flex-col shadow-2xl origin-center w-[80vw] max-w-[400px] md:w-[320px] md:max-w-none lg:w-[340px] xl:w-[360px] 2xl:w-[380px] aspect-[3/4]';

  return (
      <article key={project.id} className={cardClass}>
                <header className="flex-shrink-0">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-3">
            {getProjectText(project.category, language)}
                  </p>
                  <div className="w-full h-40 bg-white/10 rounded-xl overflow-hidden mb-4 border border-white/20">
                    <img
              src={getImageUrl(project.previewImage)}
              alt={getProjectText(project.title, language)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.parentElement!.innerHTML =
                  `<div class="w-full h-full flex items-center justify-center text-white/50 text-xs">${language === 'es' ? 'Sin imagen' : 'No image'}</div>`;
                      }}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl leading-tight font-semibold mb-3">
            {getProjectText(project.title, language)}
                  </h3>
                </header>

                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-[11px] leading-relaxed text-white/90 mb-4">
            {getProjectText(project.shortDescription, language)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/20 rounded-md text-[9px] font-medium tracking-wide"
              >
                {tech}
                    </span>
            ))}
                  </div>

                  <footer className="flex justify-end">
            <button
              onClick={(e) => handleProjectClick(e, project)}
                      className="px-4 py-2 rounded-lg border border-white/50 flex items-center gap-2 text-[11px] font-medium hover:bg-white/20 transition-colors group"
                    >
                      <span>{t('common.verProyecto')}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
            </button>
                  </footer>
                </div>
              </article>
    );
  };

  return (
    <>
      <section
        id="proyectos"
        ref={proyectosSectionRef}
        className="relative bg-gray-100 dark:bg-[#2a2e32] overflow-hidden mt-12 xl:rounded-3xl md:h-screen"
      >
        {/* VERSIÓN DESKTOP: Scroll Horizontal */}
        <div
          id="proyectos-desktop"
          className="hidden md:block sticky top-0 h-screen flex flex-col"
        >
          <div className="shrink-0 px-6 md:px-16 md:pt-16 2xl:pt-32 pb-4 flex flex-col gap-2 bg-gray-100 dark:bg-[#2a2e32] backdrop-blur-sm z-10">
            <h2
              id="estudios-title"
              className="text-4xl font-bold text-center mb-4 2xl:mb-12 relative inline-block mx-auto mt-12"
              aria-label="Proyectos destacados"
            >
              <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
                {t('projects.section.title')}
                    </span>
              <span className="text-[#ff9800]">{t('projects.section.titleHighlight')}</span>
            </h2>
                  </div>

          <div className="flex-1 flex items-center justify-center px-0 py-24 md:py-32 overflow-visible">
            <div className="relative w-full h-full max-w-6xl mx-auto overflow-visible">
              <div
                id="cards-wrapper"
                className="flex gap-10 md:gap-16 items-center will-change-transform"
              >
                <div
                  id="intro-text"
                  className="flex-shrink-0 w-full flex items-center justify-center px-6 pb-32"
                >
                  <div className="text-center max-w-2xl">
                    <p className="text-xs tracking-[0.3em] uppercase mb-4 text-gray-700 dark:text-white">
                        {t('projects.section.tagline')}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-gray-700 dark:text-white">
                      {t('projects.section.discoverTitle')}
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 dark:text-white">
                      {t('projects.section.description')}
                    </p>
                  </div>
                </div>

                {/* Renderizar proyectos destacados */}
                {featuredProjects.map((project) => renderProjectCard(project))}

              {/* Texto final */}
              <div
                id="outro-text"
                className="flex-shrink-0 w-full flex items-center justify-center px-6 pb-32"
              >
                <div className="text-center max-w-2xl">
                    <p className="text-xs tracking-[0.3em] uppercase mb-4 text-gray-700 dark:text-white">
                    {t('projects.section.outro.tagline')}
                  </p>
                    <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-gray-700 dark:text-white">
                    {t('projects.section.outro.title')}
                  </h2>
                    <p className="text-sm md:text-base text-gray-700 dark:text-white">
                    {t('projects.section.outro.description')}
                  </p>

                  <a
                    href="/proyectos"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 mt-4"
                  >
                    {t('projects.section.outro.button')}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VERSIÓN MÓVIL: Scroll Vertical */}
      <div
        id="proyectos-mobile"
        className="block md:hidden py-12 px-6"
      >
        <div className="mb-12 text-center">
          <h2
            id="proyectos-mobile-title"
            className="text-4xl font-bold mb-4 relative inline-block mx-auto"
            aria-label="Proyectos destacados"
          >
              <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
              Proyectos
            </span>
            <span className="text-[#ff9800]">destacados</span>
          </h2>
        </div>

        <div id="intro-text-mobile" className="mb-16 text-center">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-gray-700 dark:text-white">
            Explorando proyectos
          </p>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Descubre mi trabajo
          </h2>
            <p className="text-sm text-gray-700 dark:text-white">
            Una selección de proyectos que representan mi pasión por el
            desarrollo y la creación de experiencias digitales únicas.
          </p>
        </div>

        <div id="cards-wrapper-mobile" className="space-y-16">
            {/* Renderizar proyectos destacados móvil */}
            {featuredProjects.map((project) => renderProjectCard(project, true))}

          {/* Texto final */}
          <div id="outro-text-mobile" className="mt-16 mb-8 text-center">
              <p className="text-xs tracking-[0.3em] uppercase mb-4 text-gray-700 dark:text-white">
              Gracias por explorar
            </p>
              <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
              ¿Trabajamos juntos?
            </h2>
              <p className="text-sm text-gray-700 dark:text-white mb-6">
              Si te gustó lo que viste, estaré encantado de conversar sobre
              cómo podemos crear algo increíble juntos.
            </p>

            <a
              href="/proyectos"
                className="inline-flex items-center gap-3 dark:bg-white bg-[#ff9800] text-white dark:text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Ver todos los proyectos
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>

      {/* Modal de Proyecto */}
      <ProjectModal
        isOpen={isOpen}
        project={selectedProject}
        onClose={closeModal}
        onNext={goToNext}
        onPrevious={goToPrevious}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
      />
    </>
  );
}
