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
