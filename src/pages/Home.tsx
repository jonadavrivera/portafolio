import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/layout/Loader';
import DecarativeCircle from '../components/layout/DecarativeCircle';
import Header from '../components/layout/Header';
import HeroSection from '../components/sections/HeroSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import CareerSection from '../components/sections/CareerSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TechnologiesSection from '../components/sections/TechnologiesSection';
import WorkProcess from '../components/sections/WorkProcess';
import ConclusionSection from '../components/sections/ConclusionSection';
import EmailModal from '../components/layout/EmailModal';
import Footer from '../components/layout/Footer';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useApp } from '../contexts/AppContext';

function Home() {
  const { isFirstLoad, setFirstLoadComplete } = useApp();
  const [showLoader, setShowLoader] = useState(isFirstLoad);
  const [loaderComplete, setLoaderComplete] = useState(!isFirstLoad);
  const location = useLocation();

  // Usar el hook de smooth scroll
  useSmoothScroll();

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setLoaderComplete(true);
    setFirstLoadComplete(); // Marcar que la app ya se cargó
  };

  // Si no es la primera carga, asegurar que loaderComplete sea true
  useEffect(() => {
    if (!isFirstLoad) {
      setLoaderComplete(true);
    }
  }, [isFirstLoad]);

  // Manejar scroll después de que el loader termine si hay hash
  useEffect(() => {
    if (loaderComplete && location.hash) {
      const timer = setTimeout(() => {
        // Buscar primero el anchor específico, luego la sección
        const anchor = document.querySelector(`${location.hash}-anchor`);
        const element = anchor || document.querySelector(location.hash);
        
        if (element) {
          const header = document.getElementById('header');
          const headerHeight = header ? header.offsetHeight + 40 : 140;
          
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
        }
      }, 800); // Aumentar el delay para asegurar que todo esté renderizado
      return () => clearTimeout(timer);
    }
  }, [loaderComplete, location.hash]);

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <DecarativeCircle />
      <Header loaderComplete={loaderComplete} />

      <main className="relative pt-32 max-w-7xl mx-auto">
        <HeroSection loaderComplete={loaderComplete} />
        <ExperienceSection />
        <CareerSection />
        <ProjectsSection />
        <TechnologiesSection />
        <WorkProcess />
        <ConclusionSection />
      </main>

      <Footer />
      <EmailModal />
    </>
  );
}

export default Home;
