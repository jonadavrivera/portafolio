/**
 * Helper function to load images from assets folder
 * Works with Vite's asset handling
 * 
 * Supports:
 * - Absolute paths starting with / (from public folder)
 * - Relative paths starting with ./assets/ (converted to /assets/)
 * - Full URLs (http://, https://)
 */
export function getImageUrl(path: string): string {
  // Si la ruta ya es una URL completa, retornarla
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Si la ruta comienza con /, es una ruta absoluta desde public (ya está correcta)
  if (path.startsWith('/')) {
    return path;
  }

  // Para rutas relativas que comienzan con ./assets/, convertir a absoluta
  if (path.startsWith('./assets/')) {
    const cleanPath = path.replace('./assets/', '/assets/');
    return cleanPath;
  }

  // Si la ruta comienza con assets/, agregar /
  if (path.startsWith('assets/')) {
    return `/${path}`;
  }

  // Si no coincide con ningún patrón, asumir que está en assets/images
  return `/assets/images/${path}`;
}

