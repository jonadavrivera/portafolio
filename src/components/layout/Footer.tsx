import logoLight from '../../assets/images/logobn.svg';
import logoDark from '../../assets/images/logo.svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        {/* Fecha y nombre */}
        <div className="text-center flex items-center justify-center gap-2">
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            © {currentYear}
          </p>
          <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
            Jonathan Rivera
          </p>
        </div>

        {/* Logo grande centrado */}
        <div className="mt-8 md:mt-12 w-full flex items-center justify-center">
          <div className="relative w-full flex items-center justify-center">
            {/* Logo para modo light */}
            <img
              src={logoLight}
              alt="Jonathan Rivera Logo"
              className="w-[50vw] lg:w-[40vw] h-auto dark:hidden"
            />
            {/* Logo para modo dark */}
            <img
              src={logoDark}
              alt="Jonathan Rivera Logo"
              className="w-[50vw] lg:w-[40vw] h-auto hidden dark:block"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

