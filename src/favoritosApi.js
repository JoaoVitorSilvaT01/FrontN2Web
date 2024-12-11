import axios from 'axios';

const API_URL = 'https://apitmdb-beryl.vercel.app'; // Ajuste conforme sua porta/host

export const getFavoritos = async () => {
  const response = await axios.get(`${API_URL}/favoritos`);
  return response.data;
};

export const getFavoritoById = async (id) => {
  const response = await axios.get(`${API_URL}/favoritos/${id}`);
  return response.data;
};

export const addFavorito = async (favorito) => {
  // favorito = { tmdb_id, titulo, caminho_poster, comentarios_usuario (opcional) }
  const response = await axios.post(`${API_URL}/favoritos`, favorito);
  return response.data;
};

export const updateFavorito = async (id, comentarios_usuario) => {
  const response = await axios.put(`${API_URL}/favoritos/${id}`, { comentarios_usuario });
  return response.data;
};

export const deleteFavorito = async (id) => {
  const response = await axios.delete(`${API_URL}/favoritos/${id}`);
  return response.data;
};
