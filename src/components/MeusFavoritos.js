import React, { useEffect, useState } from 'react';
import { getFavoritos, updateFavorito, deleteFavorito } from '../favoritosApi';
import { Container, Row, Col, Card, Button, Form, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles.css';

const MeusFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null); // 'salvar' ou 'remover'
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const loadFavoritos = async () => {
      const data = await getFavoritos();

      // Ordenar os favoritos pela data_criacao em ordem decrescente
      const sortedData = data.sort(
        (a, b) => new Date(b.data_criacao) - new Date(a.data_criacao)
      );

      setFavoritos(sortedData);

      // Inicializar os comentários no estado
      const initialComentarios = {};
      sortedData.forEach((f) => {
        initialComentarios[f.id] = f.comentarios_usuario || '';
      });
      setComentarios(initialComentarios);
    };
    loadFavoritos();
  }, []);

  const handleComentarioChange = (id, value) => {
    setComentarios({ ...comentarios, [id]: value });
  };

  const handleConfirmAction = (action, id) => {
    setModalAction(action);
    setSelectedId(id);
    setShowModal(true);
  };

  const handleExecuteAction = async () => {
    setShowModal(false);

    if (modalAction === 'salvar') {
      try {
        const comentario = comentarios[selectedId];
        await updateFavorito(selectedId, comentario);
        setStatusMessage('Comentário atualizado com sucesso!');
        setTimeout(() => setStatusMessage(''), 3000);
      } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
        setStatusMessage('Erro ao atualizar comentário.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } else if (modalAction === 'remover') {
      try {
        await deleteFavorito(selectedId);
        setFavoritos(favoritos.filter((f) => f.id !== selectedId));
        setStatusMessage('Favorito removido com sucesso!');
        setTimeout(() => setStatusMessage(''), 3000);
      } catch (error) {
        console.error('Erro ao deletar favorito:', error);
        setStatusMessage('Erro ao deletar favorito.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    }

    setModalAction(null);
    setSelectedId(null);
  };

  return (
    <div className='LISTAFILMES'>
    <Container style={{ paddingTop: 80 }}>
      <h1 className="mb-4 text-center">Meus Filmes Favoritos</h1>
      {statusMessage && <Alert variant="info" className="mb-4">{statusMessage}</Alert>}
      <Row xs={1} md={4} className="g-4">
        {favoritos.map((fav) => (
          <Col key={fav.id}>
            <Card className="h-100" style={{backgroundColor:'#001a2c'}}>
              <Link to={`/favorito/${fav.id}`}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${fav.caminho_poster}`} style={{ cursor: 'pointer' }} />
              </Link>
              <Card.Body>
                <Card.Title style={{color:'white'}}>{fav.titulo}</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label style={{color:'white'}}>Comentário (máx: 150 caracteres)</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={comentarios[fav.id] || ''}
                    onChange={(e) => handleComentarioChange(fav.id, e.target.value)}
                    maxLength={150}
                    rows={2}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => handleConfirmAction('salvar', fav.id)}>Salvar</Button>
                  <Button variant="danger" onClick={() => handleConfirmAction('remover', fav.id)}>Remover</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de Confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar ação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === 'salvar' 
            ? 'Deseja realmente salvar as alterações no comentário?'
            : 'Deseja realmente remover este favorito?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleExecuteAction}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default MeusFavoritos;
