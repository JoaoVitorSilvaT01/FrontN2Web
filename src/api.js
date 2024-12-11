import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN; // Token seguro
 // Seu Bearer Token

// Filmes populares
export const fetchMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        language: 'pt-BR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("ERRO AO BUSCAR FILME:", error);
    return [];
  }
};

// Detalhes do filme
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.error("ERRO AO BUSCAR DETALHES DO FILME:", error);
    return null;
  }
};

// Filmes por Gênero
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        with_genres: genreId,
        language: 'pt-BR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("ERRO AO BUSCAR FILMES POR GÊNERO:", error);
    return [];
  }
};

// Pesquisa de filmes pelo nome
export const fetchSearchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        query,
        language: 'pt-BR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("ERRO AO PESQUISAR FILMES:", error);
    return [];
  }
};

// Buscar lista de gêneros
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        language: 'pt-BR',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("ERRO AO BUSCAR GÊNEROS:", error);
    return [];
  }
};
