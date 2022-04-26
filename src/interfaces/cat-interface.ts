export interface IBreed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

export interface ICatDetails {
  id: string;
  breeds: IBreed[];
  url: string;
}

export interface ICatProviderProps {
  children?: React.ReactNode;
}

export interface ICatContextState {
  breeds: IBreed[];
  setBreeds: React.Dispatch<React.SetStateAction<IBreed[]>>;
  currentBreed: string;
  setCurrentBreed: React.Dispatch<React.SetStateAction<string>>;
  cats: ICatDetails[];
  setCats: React.Dispatch<React.SetStateAction<ICatDetails[]>>;
  currentCat: string;
  setCurrentCat: React.Dispatch<React.SetStateAction<string>>;
}
