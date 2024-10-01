import React, { createContext, useState, ReactNode } from 'react';

interface GenderContextType {
  gender: string;
  setGender: (gender: string) => void;
}

export const GenderContext = createContext<GenderContextType | null>(null);

interface GenderProviderProps {
  children: ReactNode;
}

export const GenderProvider: React.FC<GenderProviderProps> = ({ children }) => {
  const [gender, setGender] = useState<string>('');

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};
