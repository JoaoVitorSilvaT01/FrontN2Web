import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../styles.css';

const FilmesLista = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    loadMovies();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className='LISTAFILMES'>
    <Container style={{ paddingTop: 80 }} > 
      <h1 className="mb-4 text-center">Filmes Populares</h1>
      <Form className="d-flex mb-4" onSubmit={handleSearchSubmit}>
        <Form.Control
          type="text"
          placeholder="Pesquise um filme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="me-2"
        />
        <Button type="submit" variant="primary">Buscar</Button>
      </Form>
      <Row xs={1} md={4} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Link to={`/filme/${movie.id}`} className="text-decoration-none text-dark">
              <Card className="h-100"  style={{backgroundColor:'#001a2c'}}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                <Card.Body>
                  <Card.Title style={{color:'white'}}>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default FilmesLista;
