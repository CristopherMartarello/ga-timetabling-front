/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface ResponseContextType<T> {
  responseData: T | null;
  setResponseData: (data: T) => void;
}

const ResponseContext = createContext<ResponseContextType<any> | undefined>(undefined);

export const ResponseProvider = ({ children }: { children: ReactNode }) => {
  const [responseData, setResponseData] = useState<any>(null); 

  return (
    <ResponseContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponse = <T,>(): ResponseContextType<T> => {
  const context = useContext(ResponseContext);
  if (!context) {
    throw new Error('useResponse must be used within a ResponseProvider');
  }
  return context;
};
