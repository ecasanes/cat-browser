import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || 'https://api.thecatapi.com/v1';

const instance = axios.create({ baseURL });

instance.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY || '';

export const getBreeds = async () => {
  try {
    const { data } = await instance.get('/breeds');
    return data;
  } catch (error) {
    console.error('error: ', error);
    return null;
  }
};

export const getCatsByBreed = async (breedId: string, page: number, limit = 6) => {
  try {
    const { data } = await instance.get(
      `/images/search?breed_id=${breedId}&limit=${limit}&page=${page}&order=DESC`
    );
    return data;
  } catch (error) {
    console.error('error: ', error);
    return null;
  }
};

export const getSingleCat = async (imageId: string) => {
  try {
    const { data } = await instance.get(`/images/${imageId}`);
    return data;
  } catch (error) {
    console.error('error: ', error);
    return null;
  }
};
