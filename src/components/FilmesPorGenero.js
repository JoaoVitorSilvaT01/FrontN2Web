import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMoviesByGenre } from '../api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles.css';

const FilmesPorGenero = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMoviesByGenre(id);
      setMovies(data);
    };
    loadMovies();
  }, [id]);

  return (
    <div className='LISTAFILMES'>
    <Container style={{paddingTop:'80px'}}>
      <h1 className="mb-4 text-center">Filmes do Gênero</h1>
      <Row xs={1} md={4} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Link to={`/filme/${movie.id}`} className="text-decoration-none text-dark">
              <Card className="h-100" style={{backgroundColor:'#001a2c'}}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
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

export default FilmesPorGenero;
