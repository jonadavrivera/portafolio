import { useState, useMemo, useEffect } from 'react';
import { useProjectModal } from '../hooks/useProjectModal';
import type { Project } from '../hooks/useProjectModal';
import ProjectModal from '../components/layout/ProjectModal';
import { useProjectsPageAnimation } from '../hooks/useProjectsPageAnimation';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import EmailModal from '../components/layout/EmailModal';
import projectsData from '../data/projects.json';
import { useApp } from '../contexts/AppContext';
import { getImageUrl } from '../utils/imageLoader';

export default function Proyectos() {
  const { isFirstLoad } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
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

  // Expandir el header automáticamente en esta página
  useEffect(() => {
    // Pequeño delay para asegurar que el header esté renderizado
    const timer = setTimeout(() => {
      if ((window as any).expandHeader) {
        (window as any).expandHeader();
      }
    }, 100); // Reducido porque ya no hay loader

    return () => clearTimeout(timer);
  }, []);

  // Combinar proyectos destacados y todos los proyectos
  const allProjects = useMemo(
    () => [
      ...(projectsData.featured as Project[]),
      ...(projectsData.all as Project[]),
    ],
    []
  );

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allProjects.forEach((project) => {
      uniqueCategories.add(project.category);
    });
    return ['Todos', ...Array.from(uniqueCategories).sort()];
  }, [allProjects]);

  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'Todos') {
      return allProjects;
    }
    return allProjects.filter(
      (project) => project.category === selectedFilter
    );
  }, [allProjects, selectedFilter]);

  const { titleRef, descriptionRef, projectsContainerRef } =
    useProjectsPageAnimation(filteredProjects.length);

  const handleProjectClick = (project: Project) => {
    openModal(project, filteredProjects);
  };

    return (
    <>
      <Header loaderComplete={!isFirstLoad} />
      <div className="min-h-screen bg-white dark:bg-[#212529] pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
                Todos los
              </span>
              <span className="text-[#ff9800]">proyectos</span>
            </h1>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Una colección completa de proyectos que demuestran mi experiencia
              en desarrollo web, aplicaciones móviles y soluciones digitales
              innovadoras.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`filter-button px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedFilter === category
                    ? 'bg-[#ff9800] text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Count */}
          <div className="mb-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando <span className="font-semibold text-[#ff9800]">{filteredProjects.length}</span>{' '}
              {filteredProjects.length === 1 ? 'proyecto' : 'proyectos'}
              {selectedFilter !== 'Todos' && (
                <span> en {selectedFilter}</span>
              )}
            </p>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div
              ref={projectsContainerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="project-card-item bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 cursor-pointer transition-all duration-300"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={getImageUrl(project.previewImage)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.error-placeholder')) {
                        const errorDiv = document.createElement('div');
                        errorDiv.className =
                          'error-placeholder w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-900';
                        errorDiv.textContent = 'Sin imagen';
                        parent.appendChild(errorDiv);
                      }
                    }}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#ff9800] text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
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
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>
                      {project.startDate} – {project.endDate}
                    </span>
                  </div>

                  {/* View Button */}
                  <button className="mt-4 w-full py-2 px-4 bg-[#ff9800] hover:bg-[#e68900] text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                    <span>Ver proyecto</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </button>
                </div>
              </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                No se encontraron proyectos en esta categoría
              </p>
              <button
                onClick={() => setSelectedFilter('Todos')}
                className="px-6 py-3 bg-[#ff9800] hover:bg-[#e68900] text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Ver todos los proyectos
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />

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

      {/* Modal de Contacto */}
      <EmailModal />
    </>
  );
}
