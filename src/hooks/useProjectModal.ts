import { useState } from 'react';

export interface ProjectImage {
  url: string;
  title?: string | { es: string; en: string };
  description?: string | { es: string; en: string };
}

export interface Project {
  id: string;
  title: string | { es: string; en: string };
  category: string | { es: string; en: string };
  previewImage: string;
  shortDescription: string | { es: string; en: string };
  technologies: string[];
  fullDescription: string | { es: string; en: string };
  startDate: string;
  endDate: string;
  images: ProjectImage[];
  header?: string | { es: string; en: string };
  optionalDescription?: string | { es: string; en: string };
}

// Helper function to get text based on language
export function getProjectText(
  text: string | { es: string; en: string } | undefined,
  language: 'es' | 'en'
): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[language] || text.es || '';
}

export function useProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (project: Project, allProjects: Project[] = []) => {
    setProjectsList(allProjects);
    const index = allProjects.findIndex((p) => p.id === project.id);
    setCurrentIndex(index >= 0 ? index : 0);
    setSelectedProject(project);
    setIsOpen(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProject(null);
    setProjectsList([]);
    setCurrentIndex(0);
    // Restaurar scroll del body
    document.body.style.overflow = '';
  };

  const goToNext = () => {
    if (currentIndex < projectsList.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedProject(projectsList[nextIndex]);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedProject(projectsList[prevIndex]);
    }
  };

  const canGoNext = currentIndex < projectsList.length - 1;
  const canGoPrevious = currentIndex > 0;

  return {
    isOpen,
    selectedProject,
    openModal,
    closeModal,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
    currentIndex,
    totalProjects: projectsList.length,
  };
}

