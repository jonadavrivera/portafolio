import { useLoader } from '../../hooks/useLoader';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const {
    overlayRef,
    loaderInnerRef,
    progressWrapperRef,
    progressNumberRef,
  } = useLoader({ onComplete });

  return (
    <div
      id="loader-overlay"
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-[#212529]"
    >
      <div
        id="loader-inner"
        ref={loaderInnerRef}
        className="relative w-full max-w-md h-[70vh] flex items-center justify-center px-6"
      >
        <p className="absolute top-6 text-[10px] tracking-[0.35em] uppercase text-gray-800 dark:text-gray-400">
          Portafolio Jonathan Rivera
        </p>

        <div
          id="loader-progress-wrapper"
          ref={progressWrapperRef}
          className="text-4xl md:text-5xl font-semibold tabular-nums leading-none"
        >
          <span id="loader-progress-number" className="text-gray-800 dark:text-gray-400" ref={progressNumberRef}>
            0
          </span>
          <span className="dark:text-gray-500 text-gray-800">%</span>
        </div>
      </div>
    </div>
  );
}
