import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PaginaInicial from './components/PaginaInicial';
import FilmesLista from './components/FilmesLista';
import FilmeDetalhes from './components/FilmeDetalhes';
import FilmesPorGenero from './components/FilmesPorGenero';
import PesquisaResultados from './components/PesquisaResultados';
import AppNavbar from './components/Navbar';
import MeusFavoritos from './components/MeusFavoritos';
import Explicacao from './components/Explicacao';
import FavoritoDetalhes from './components/FavoritoDetalhes'; // Importar a nova página

function App() {
  const location = useLocation(); // Verificar a rota atual

  return (
    <>
      {location.pathname !== '/' && <AppNavbar />}

      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/filmes" element={<FilmesLista />} />
        <Route path="/filme/:id" element={<FilmeDetalhes />} />
        <Route path="/genero/:id" element={<FilmesPorGenero />} />
        <Route path="/search" element={<PesquisaResultados />} />
        <Route path="/favoritos" element={<MeusFavoritos />} />
        <Route path="/favorito/:id" element={<FavoritoDetalhes />} />
        <Route path="/Sobre" element={<Explicacao />} />
      </Routes>
    </>
  );
}

export default App;
