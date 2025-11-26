import { useWorkProcessAnimation } from '../../hooks/useWorkProcessAnimation';

export default function WorkProcess() {
  const {
    procesoTitleRef,
    card1Ref,
    card2Ref,
    card3Ref,
  } = useWorkProcessAnimation();

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
              Proceso de
            </span>
            <span className="text-[#ff9800]">trabajo</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Así estructuro cada proyecto: claridad en el proceso, servicios definidos
            y un enfoque que asegura resultados reales.
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
              Cómo trabajo
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Un proceso estructurado que permite alinear expectativas, reducir riesgos
              y avanzar con claridad desde el primer día.
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li><span>Análisis</span></li>
              <li><span>Diseño UX/UI</span></li>
              <li><span>Diseño de la solución</span></li>
              <li><span>Desarrollo</span></li>
              <li><span>Testing y optimización</span></li>
              <li><span>Despliegue</span></li>
            </ul>
          </div>

          {/* Columna 2: Servicios */}
          <div
            ref={card2Ref}
            className="border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 flex flex-col gap-3 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Servicios
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Soluciones a medida para empresas y clientes freelance, adaptadas a sus
              necesidades y objetivos.
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li><span>Desarrollo web a medida</span> </li>
              <li><span>Aplicaciones móviles</span></li>
              <li><span>Plataformas administrativas</span></li>
              {/* <li><span>Integración de pagos</span>  </li> */}
              <li><span>Optimización, auditorías y SEO</span></li>
              <li><span>Automatización de procesos</span></li>
              <li><span>Desarrollo continuo y mantenimiento</span></li>
            </ul>
          </div>

          {/* Columna 3: Mi enfoque */}
          <div
            ref={card3Ref}
            className="border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 flex flex-col gap-3 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Mi enfoque
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Principios que guían cada proyecto para asegurar resultados consistentes,
              escalables y sostenibles en el tiempo.
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li><span>Código limpio</span></li>
              <li><span>Comunicación clara</span></li>
              <li><span>Entregas puntuales</span></li>
              <li><span>Documentación</span></li>
              <li><span>Escalabilidad</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

