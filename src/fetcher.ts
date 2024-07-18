const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_API_KEY || '';
const AUTHORIZATION_KEY = process.env.REACT_APP_AUTHORIZATION_KEY || '';

const headers = {
  accept: 'application/json',
  Authorization: AUTHORIZATION_KEY
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, {
      method: 'GET',
      headers: headers as HeadersInit
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`, {
      method: 'GET',
      headers: headers as HeadersInit
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    throw error;
  }
};

export const searchMovies = async (keyword: string, year?: number) => {
  let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}`;
  if (year) {
    url += `&year=${year}`;
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers as HeadersInit
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to search movies with keyword "${keyword}" and year "${year}":`, error);
    throw error;
  }
};