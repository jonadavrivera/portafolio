import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage as useLanguageContext } from '../contexts/LanguageContext';

interface UseHeroAnimationProps {
  onHeaderExpand: () => void;
  loaderComplete: boolean;
}

export function useHeroAnimation({ onHeaderExpand, loaderComplete }: UseHeroAnimationProps) {
  const { t, language } = useLanguageContext();
  const introGreetingRef = useRef<HTMLParagraphElement>(null);
  const introNameRef = useRef<HTMLHeadingElement>(null);
  const titleDesarrolladorRef = useRef<HTMLHeadingElement>(null);
  const textoSitiosWebRef = useRef<HTMLSpanElement>(null);
  const typingCursorRef = useRef<HTMLSpanElement>(null);
  const profileImageRef = useRef<HTMLImageElement>(null);
  const availabilityBadgeRef = useRef<HTMLDivElement>(null);
  const socialDesktopRef = useRef<HTMLElement>(null);
  const socialMobileRef = useRef<HTMLElement>(null);
  const descriptionTextRef = useRef<HTMLParagraphElement>(null);
  const buttonProjectsRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const aboutMeTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Solo inicializar cuando el loader haya terminado
    if (!loaderComplete) return;

    const introGreeting = introGreetingRef.current;
    const introName = introNameRef.current;
    const titleDesarrollador = titleDesarrolladorRef.current;
    const textoSitiosWeb = textoSitiosWebRef.current;
    const typingCursor = typingCursorRef.current;
    const profileImage = profileImageRef.current;
    const availabilityBadge = availabilityBadgeRef.current;
    const socialDesktop = socialDesktopRef.current;
    const socialMobile = socialMobileRef.current;
    const descriptionText = descriptionTextRef.current;
    const buttonProjects = buttonProjectsRef.current;
    const aboutMe = aboutMeRef.current;
    const aboutMeTitle = aboutMeTitleRef.current;

    if (
      !introGreeting ||
      !introName ||
      !titleDesarrollador ||
      !textoSitiosWeb
    )
      return;

    function typewriterEffect(
      element: HTMLElement,
      text: string,
      speed = 50,
      isHTML = false
    ): Promise<void> {
      return new Promise((resolve) => {
        // Limpiar completamente el contenido
        if (isHTML) {
          element.innerHTML = '';
        } else {
          element.textContent = '';
        }
        
        let i = 0;
        const timer = setInterval(() => {
          if (i < text.length) {
            if (isHTML) {
              if (text.includes('Jonathan Rivera')) {
                const beforeSpan = text.substring(0, text.indexOf('Jonathan Rivera'));
                const spanText = 'Jonathan Rivera';
                const afterSpan = text.substring(
                  text.indexOf('Jonathan Rivera') + spanText.length
                );

                if (i < beforeSpan.length) {
                  element.innerHTML = beforeSpan.substring(0, i + 1);
                } else if (i < beforeSpan.length + spanText.length) {
                  const spanProgress = i - beforeSpan.length + 1;
                  element.innerHTML =
                    beforeSpan +
                    '<span class="text-[#ff9800]">' +
                    spanText.substring(0, spanProgress) +
                    '</span>';
                } else {
                  const totalProgress = i + 1;
                  element.innerHTML =
                    beforeSpan +
                    '<span class="text-[#ff9800]">' +
                    spanText +
                    '</span>' +
                    afterSpan.substring(
                      0,
                      totalProgress - beforeSpan.length - spanText.length
                    );
                }
              } else {
                element.innerHTML = text.substring(0, i + 1);
              }
            } else {
              // Establecer el contenido completo en cada iteración, no agregar
              element.textContent = text.substring(0, i + 1);
            }
            i++;
          } else {
            clearInterval(timer);
            // Asegurar que el texto completo esté al final
            if (isHTML) {
              element.innerHTML = text;
            } else {
              element.textContent = text;
            }
            resolve();
          }
        }, speed);
      });
    }

    gsap.set(
      [
        titleDesarrollador,
        availabilityBadge,
        socialDesktop,
        socialMobile,
        descriptionText,
        buttonProjects,
        profileImage,
        typingCursor,
      ],
      {
        opacity: 0,
      }
    );

    // Configurar estado inicial del bloque "Sobre mí"
    if (aboutMe) {
      gsap.set(aboutMe, {
        opacity: 0,
        y: 40,
      });
    }
    if (aboutMeTitle) {
      gsap.set(aboutMeTitle, {
        opacity: 0,
        y: 20,
        scale: 0.95,
      });
    }

    gsap.set([introGreeting, introName], {
      y: 20,
    });

    // Limpiar completamente el contenido inicial
    titleDesarrollador.innerHTML = '';
    if (textoSitiosWeb) textoSitiosWeb.textContent = '';

    const mainTL = gsap.timeline();

    mainTL
      .to(introGreeting, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(
        introName,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to({}, { duration: 0.5 })
      .set(titleDesarrollador, { opacity: 1 })
      .call(() => {
        onHeaderExpand();
      })
      .addPause()
      .call(() => {
        if (titleDesarrollador) {
          // Asegurar que el elemento esté completamente limpio
          titleDesarrollador.textContent = '';
          const titleText = t('hero.title');
          typewriterEffect(titleDesarrollador, titleText, 80).then(() => {
            mainTL.resume();
          });
        }
      })
      .to({}, { duration: 0.3 })
      .addPause()
      .call(() => {
        if (textoSitiosWeb) {
          const typingText = language === 'es' 
            ? `de ${t('hero.typing.sitiosWeb').toLowerCase()}`
            : `of ${t('hero.typing.sitiosWeb')}`;
          const webStartTime = ((typingText.length - 3) * 80) / 1000;

          // Asegurar que el elemento esté completamente limpio
          textoSitiosWeb.textContent = '';
          
          const typingPromise = typewriterEffect(
            textoSitiosWeb,
            typingText,
            80
          );

          setTimeout(() => {
            if (profileImage) {
              gsap.to(profileImage, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
            if (availabilityBadge) {
              gsap.to(availabilityBadge, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
            if (socialDesktop) {
              gsap.to(socialDesktop, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
            if (socialMobile) {
              gsap.to(socialMobile, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
            if (descriptionText) {
              gsap.to(descriptionText, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
            if (buttonProjects) {
              gsap.to(buttonProjects, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
            // Animar "Sobre mí" al mismo tiempo que los otros elementos
            if (aboutMeTitle) {
              gsap.to(aboutMeTitle, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
            if (aboutMe) {
              gsap.to(aboutMe, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
          }, webStartTime * 1000);

          typingPromise.then(() => {
            mainTL.resume();
          });
        }
      })
      .to(typingCursor, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
      .to(typingCursor, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.inOut',
      })
      .to(typingCursor, {
        opacity: 1,
        duration: 0.5,
        ease: 'power1.inOut',
      })
      .to(typingCursor, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      });
  }, [onHeaderExpand, loaderComplete, language, t]);

  return {
    introGreetingRef,
    introNameRef,
    titleDesarrolladorRef,
    textoSitiosWebRef,
    typingCursorRef,
    profileImageRef,
    availabilityBadgeRef,
    socialDesktopRef,
    socialMobileRef,
    descriptionTextRef,
    buttonProjectsRef,
    aboutMeRef,
    aboutMeTitleRef,
  };
}

