import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ImageContextType {
  imageId: string;
  setImageId: React.Dispatch<React.SetStateAction<string>>;
}

interface ImageContextProviderProps {
    children: ReactNode;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider = ({children}:ImageContextProviderProps) => {
  const [imageId, setImageId] = useState<string>('');

  return (
    <ImageContext.Provider value={{ imageId, setImageId }}>
      {children}
    </ImageContext.Provider>
  );
};
