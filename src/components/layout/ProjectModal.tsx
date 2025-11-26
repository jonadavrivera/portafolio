import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Project } from '../../hooks/useProjectModal';
import { getProjectText } from '../../hooks/useProjectModal';
import { getImageUrl } from '../../utils/imageLoader';
import { useLanguage as useLanguageContext } from '../../contexts/LanguageContext';

interface ProjectModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export default function ProjectModal({
  isOpen,
  project,
  onClose,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevProjectRef = useRef<Project | null>(null);
  const isInitialMount = useRef(true);
  const { t, language } = useLanguageContext();

  // Función para hacer scroll al top del modal
  const scrollToTop = () => {
    // Scroll del contenedor principal (móvil)
    contentContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    // Scroll de las columnas individuales (desktop)
    leftContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    rightContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navegación con teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && canGoPrevious) {
        scrollToTop();
        onPrevious();
      } else if (e.key === 'ArrowRight' && canGoNext) {
        scrollToTop();
        onNext();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, canGoNext, canGoPrevious, onNext, onPrevious]);

  // Función para animar el contenido cuando cambia el proyecto
  const animateContentChangeRef = useRef<(() => void) | null>(null);
  
  useEffect(() => {
    animateContentChangeRef.current = () => {
      const leftContent = leftContentRef.current;
      const rightContent = rightContentRef.current;

      if (!leftContent || !rightContent) return;

      // Pequeño delay para asegurar que el DOM se actualizó
      setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        
        // Obtener elementos internos para animar
        const leftElements = leftContent.querySelectorAll('h2, h3, p, div > div');
        const rightImages = rightContent.querySelectorAll('.space-y-6 > div, .image-container');

        // Configurar estado inicial para el cambio
        if (isMobile) {
          // En móvil, animar verticalmente
          gsap.set(leftContent, { opacity: 0, y: 20 });
          gsap.set(rightContent, { opacity: 0, y: 20 });
        } else {
          // En desktop, animar horizontalmente
          gsap.set(leftContent, { opacity: 0, x: -20 });
          gsap.set(rightContent, { opacity: 0, x: 20 });
        }
        gsap.set(leftElements, { opacity: 0, y: 15 });
        gsap.set(rightImages, { opacity: 0, y: 20, scale: 0.96 });

        // Animación de cambio de contenido
        const tl = gsap.timeline();

        if (isMobile) {
          // Animación vertical para móvil
          tl.to(leftContent, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          })
            .to(
              leftElements,
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                stagger: 0.06,
              },
              '-=0.3'
            )
            .to(
              rightContent,
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
              },
              '-=0.3'
            )
            .to(
              rightImages,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
                stagger: 0.08,
              },
              '-=0.3'
            );
        } else {
          // Animación horizontal para desktop
          tl.to(leftContent, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
          })
            .to(
              leftElements,
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                stagger: 0.06,
              },
              '-=0.3'
            )
            .to(
              rightContent,
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                ease: 'power2.out',
              },
              '-=0.3'
            )
            .to(
              rightImages,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
                stagger: 0.08,
              },
              '-=0.3'
            );
        }
      }, 50);
    };
  }, []);

  // Animación inicial cuando se abre el modal
  useEffect(() => {
    if (!isOpen || !project) {
      isInitialMount.current = true;
      prevProjectRef.current = null;
      return;
    }

    const overlay = overlayRef.current;
    const modal = modalRef.current;
    const leftContent = leftContentRef.current;
    const rightContent = rightContentRef.current;
    const closeButton = closeButtonRef.current;

    if (!overlay || !modal || !leftContent || !rightContent) return;

    // Si es el primer render o cambió el proyecto, animar
    const isProjectChange = prevProjectRef.current?.id !== project.id;

    if (isInitialMount.current) {
      // Animación completa inicial
      const isMobile = window.innerWidth < 768;
      const leftElements = leftContent.querySelectorAll('h2, h3, p, div > div');
      const rightImages = rightContent.querySelectorAll('.space-y-6 > div, .image-container');

      const tl = gsap.timeline();

      gsap.set(overlay, { opacity: 0 });
      gsap.set(modal, { 
        opacity: 0, 
        scale: 0.85,
        y: 30,
        filter: 'blur(10px)'
      });
      
      // Configurar estado inicial según el tamaño de pantalla
      if (isMobile) {
        gsap.set(leftContent, { opacity: 0, y: 20 });
        gsap.set(rightContent, { opacity: 0, y: 20 });
      } else {
        gsap.set(leftContent, { opacity: 0, x: -30 });
        gsap.set(rightContent, { opacity: 0, x: 30 });
      }
      
      gsap.set(closeButton, { opacity: 0, scale: 0.8 });
      gsap.set(leftElements, { opacity: 0, y: 20 });
      gsap.set(rightImages, { opacity: 0, y: 30, scale: 0.95 });

      tl.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
        .to(
          modal,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .to(
          closeButton,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        .to(
          leftContent,
          {
            opacity: 1,
            x: isMobile ? 0 : 0,
            y: isMobile ? 0 : 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          leftElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
          },
          '-=0.4'
        )
        .to(
          rightContent,
          {
            opacity: 1,
            x: isMobile ? 0 : 0,
            y: isMobile ? 0 : 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        .to(
          rightImages,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
          },
          '-=0.4'
        );

      isInitialMount.current = false;
    } else if (isProjectChange && animateContentChangeRef.current) {
      // Solo animar el contenido cuando cambia el proyecto
      animateContentChangeRef.current();
    }

    prevProjectRef.current = project;

    return () => {
      // Cleanup si es necesario
    };
  }, [isOpen, project]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;
    const leftContent = leftContentRef.current;
    const rightContent = rightContentRef.current;
    const closeButton = closeButtonRef.current;

    if (!overlay || !modal || !leftContent || !rightContent) {
      onClose();
      return;
    }

    // Timeline de salida
    const exitTl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });

    const isMobile = window.innerWidth < 768;
    
    exitTl
      .to([leftContent, rightContent], {
        opacity: 0,
        x: isMobile ? 0 : (index) => (index === 0 ? -20 : 20),
        y: isMobile ? 20 : 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(
        closeButton,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: 'power2.in',
        },
        '-=0.2'
      )
      .to(
        modal,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
          filter: 'blur(5px)',
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      )
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      );
  };

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      ></div>

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl max-w-7xl w-full h-[90vh] md:h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          aria-label={t('projects.modal.close')}
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

        {/* Content Container - Single scroll en móvil, doble scroll en desktop */}
        <div ref={contentContainerRef} className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* Left Side - Project Info */}
          <div
            ref={leftContentRef}
            className="w-full md:w-1/2 flex flex-col md:overflow-y-auto p-6 md:p-8 border-r-0 md:border-r border-b md:border-b-0 border-gray-200 dark:border-gray-800"
            style={{ scrollbarWidth: 'thin' }}
          >
            {/* Header */}
            {project.header && (
              <div className="mb-6">
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#ff9800] mb-2">
                  {getProjectText(project.header, language)}
                </h3>
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {getProjectText(project.title, language)}
            </h2>

            {/* Category */}
            <p className="text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 mb-6">
              {getProjectText(project.category, language)}
            </p>

            {/* Optional Description */}
            {project.optionalDescription && (
              <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {getProjectText(project.optionalDescription, language)}
              </p>
            )}

            {/* Full Description */}
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-semibold mb-3">
                {t('projects.modal.description')}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {getProjectText(project.fullDescription, language)}
              </p>
            </div>

            {/* Dates */}
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-semibold mb-3">
                {t('projects.modal.period')}
              </h3>
              <div className="flex items-center gap-2">
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
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  {project.startDate} – {project.endDate}
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-semibold mb-3">
                {t('projects.modal.technologies')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6 md:mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
              {canGoPrevious && (
                <button
                  onClick={() => {
                    scrollToTop();
                    onPrevious();
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
                  aria-label={t('projects.modal.previousProject')}
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
                    className="text-gray-700 dark:text-gray-300 group-hover:text-[#ff9800] transition-colors"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#ff9800] transition-colors">
                    {t('projects.modal.previous')}
                  </span>
                </button>
              )}

              {canGoNext && (
                <button
                  onClick={() => {
                    scrollToTop();
                    onNext();
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
                  aria-label={t('projects.modal.nextProject')}
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#ff9800] transition-colors">
                    {t('projects.modal.next')}
                  </span>
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
                    className="text-gray-700 dark:text-gray-300 group-hover:text-[#ff9800] transition-colors"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Images */}
          <div
            ref={rightContentRef}
            className="w-full md:w-1/2 md:overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-[#0f0f0f] md:rounded-r-3xl"
            style={{ scrollbarWidth: 'thin' }}
          >
            {project.images && project.images.length > 0 ? (
              <div className="space-y-6">
                {project.images.map((image, index) => (
                  <div key={index} className="space-y-3 image-container">
                    {image.title && (
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {getProjectText(image.title, language)}
                      </h4>
                    )}
                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 min-h-[200px] flex items-center justify-center">
                      <img
                        src={getImageUrl(image.url)}
                        alt={getProjectText(image.title, language) || `${language === 'es' ? 'Imagen' : 'Image'} ${index + 1} ${language === 'es' ? 'del proyecto' : 'of project'} ${getProjectText(project.title, language)}`}
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.error-message')) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className =
                              'error-message w-full h-64 flex items-center justify-center text-gray-400 dark:text-gray-600';
                            errorDiv.textContent = language === 'es' ? 'Sin imagen' : 'No image';
                            parent.appendChild(errorDiv);
                          }
                        }}
                      />
                    </div>
                    {image.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getProjectText(image.description, language)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 dark:text-gray-600 text-lg">
                  {language === 'es' ? 'Sin imagen' : 'No image'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

