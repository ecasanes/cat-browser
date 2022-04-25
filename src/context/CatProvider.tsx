import React, { createContext, useContext, useState } from 'react';

export interface IBreed {
  id: string;
  name: string;
}

export interface ICat {
  id: string;
  url: string;
}

interface ICatProviderProps {
  children?: React.ReactNode;
}

interface ICatContextState {
  breeds: IBreed[];
  setBreeds: React.Dispatch<React.SetStateAction<IBreed[]>>;
  currentBreed: string;
  setCurrentBreed: React.Dispatch<React.SetStateAction<string>>;
  cats: ICat[];
  setCats: React.Dispatch<React.SetStateAction<ICat[]>>;
  currentCat: string;
  setCurrentCat: React.Dispatch<React.SetStateAction<string>>;
}

export const CatContext = createContext({} as ICatContextState);

const CatProvider: React.FC<ICatProviderProps> = ({ children }) => {
  const [breeds, setBreeds] = useState<IBreed[]>([]);
  const [currentBreed, setCurrentBreed] = useState('');
  const [cats, setCats] = useState<ICat[]>([]);
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
