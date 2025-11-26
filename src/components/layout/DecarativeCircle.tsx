import { useDecorativeCircle } from '../../hooks/useDecorativeCircle';

export default function DecarativeCircle() {
  const { circleRef, containerRef } = useDecorativeCircle();

  return (
    <div
      id="decorativeContainer"
      ref={containerRef}
      className="absolute top-0 right-0 w-[20rem] h-[20rem] pointer-events-auto z-0 overflow-hidden"
    >
      <div
        id="decorativeCircle"
        ref={circleRef}
        className="decorative-circle border border-gray-400 rounded-full w-[20rem] h-[20rem] absolute right-0 top-0 pointer-events-none"
        style={{ transform: 'translate(25%, -25%)' }}
      ></div>
    </div>
  );
}
