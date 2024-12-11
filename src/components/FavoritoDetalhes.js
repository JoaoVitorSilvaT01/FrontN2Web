import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFavoritoById, updateFavorito } from '../favoritosApi';
import { fetchMovieDetails } from '../api';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import StarRating from './StarRating';

const FavoritoDetalhes = () => {
  const { id } = useParams();
  const [favorito, setFavorito] = useState(null);
  const [comentario, setComentario] = useState('');
  const [movie, setMovie] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [rating, setRating] = useState(0);

  // Modal de confirmação
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Buscar favorito do banco
      const fav = await getFavoritoById(id);
      if (fav) {
        setFavorito(fav);
        setComentario(fav.comentarios_usuario || '');

        // Buscar detalhes do filme na TMDB
        const movieData = await fetchMovieDetails(fav.tmdb_id);
        setMovie(movieData);

        // Carregar rating do localStorage
        const storedRating = localStorage.getItem(`rating_fav_${fav.id}`);
        if (storedRating) {
          setRating(Number(storedRating));
        }
      }
    };
    loadData();
  }, [id]);

  const handleSalvarClick = () => {
    // Ao clicar em Salvar, exibe o modal de confirmação
    setShowModal(true);
  };

  const handleConfirmSalvar = async () => {
    setShowModal(false); // Fecha o modal antes de executar a ação
    try {
      await updateFavorito(id, comentario);
      setStatusMessage('Comentário atualizado com sucesso!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error);
      setStatusMessage('Erro ao atualizar comentário.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (favorito) {
      localStorage.setItem(`rating_fav_${favorito.id}`, newRating);
    }
  };

  if (!favorito || !movie) {
    return <Container style={{ paddingTop: 80 }}>Carregando...</Container>;
  }

  return (
    <div className='LISTAFILMES'>
    <Container style={{ paddingTop: 80, paddingBottom: 40 }}>
      <Link to="/favoritos" className="text-decoration-none text-secondary mb-3 d-inline-block">← Voltar</Link>
      {statusMessage && <Alert variant="info" className="mb-4">{statusMessage}</Alert>}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${favorito.caminho_poster}`} />
          </Card>
        </Col>
        <Col md={8}>
          <h1 className="mb-4">{movie.title}</h1>
          <h2>Sinopse</h2>
          <p>{movie.overview}</p>
          <p><strong>Data de Lançamento:</strong> {movie.release_date}</p>
          <p><strong>Nota TMDB:</strong> {movie.vote_average}</p>

          <div className="mb-3">
            <h5>Sua Avaliação:</h5>
            <StarRating rating={rating} setRating={handleRatingChange} />
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Comentário (máx: 150 caracteres)</Form.Label>
            <Form.Control
              as="textarea"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              maxLength={150}
              rows={3}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSalvarClick}>Salvar Comentário</Button>
        </Col>
      </Row>

      {/* Modal de Confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar ação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente salvar as alterações no comentário?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleConfirmSalvar}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default FavoritoDetalhes;
