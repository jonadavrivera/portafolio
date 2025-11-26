import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AppContextType {
  isFirstLoad: boolean;
  setFirstLoadComplete: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isFirstLoad, setIsFirstLoad] = useState(() => {
    // Verificar si ya se cargó antes usando sessionStorage
    return !sessionStorage.getItem('app-loaded');
  });

  const setFirstLoadComplete = () => {
    setIsFirstLoad(false);
    sessionStorage.setItem('app-loaded', 'true');
  };

  return (
    <AppContext.Provider value={{ isFirstLoad, setFirstLoadComplete }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

