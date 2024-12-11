import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../api';
import { addFavorito } from '../favoritosApi';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import '../styles.css'

const FilmeDetalhes = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const loadMovie = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);
    };
    loadMovie();
  }, [id]);

  const handleCurtir = async () => {
    if (movie) {
      try {
        const favorito = {
          tmdb_id: movie.id,
          titulo: movie.title,
          caminho_poster: movie.poster_path,
          comentarios_usuario: '' 
        };
        await addFavorito(favorito);
        setStatusMessage('Filme adicionado aos favoritos!');
      } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        setStatusMessage('Erro ao adicionar favorito.');
      }
    }
  };

  if (!movie) {
    return <Container>Carregando...</Container>;
  }

  return (
   <div className='DETALHE'>
    <Container style={{ paddingTop:'80px' }}>
      <Link to="/filmes" className="text-decoration-none text-secondary mb-3 d-inline-block">← Voltar</Link>
      <h1 className="mb-4">{movie.title}</h1>
      <Row className="mb-4">
        <Col md={4}>
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <h2>Sinopse</h2>
          <p>{movie.overview}</p>
          <p><strong>Data de Lançamento:</strong> {movie.release_date}</p>
          <p><strong>Nota:</strong> {movie.vote_average}</p>
          <Button variant="success" onClick={handleCurtir} className="mt-3">Curtir</Button>
          {statusMessage && <Alert variant="info" className="mt-3">{statusMessage}</Alert>}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default FilmeDetalhes;
