import React, { createContext, useContext, useState } from 'react';
import { IBreed, ICatContextState, ICatDetails, ICatProviderProps } from '../interfaces';

export const CatContext = createContext({} as ICatContextState);

const CatProvider: React.FC<ICatProviderProps> = ({ children }) => {
  const [breeds, setBreeds] = useState<IBreed[]>([]);
  const [currentBreed, setCurrentBreed] = useState('');
  const [cats, setCats] = useState<ICatDetails[]>([]);
  const [currentCat, setCurrentCat] = useState('');

  return (
    <CatContext.Provider
      value={{
        breeds,
        setBreeds,
        currentBreed,
        setCurrentBreed,
        cats,
        setCats,
        currentCat,
        setCurrentCat,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCatContext = () => useContext(CatContext);

export default CatProvider;
