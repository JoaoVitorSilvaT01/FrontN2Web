import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles.css';

const PesquisaResultados = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadSearch = async () => {
      if (query) {
        const data = await fetchSearchMovies(query);
        setMovies(data);
      }
    };
    loadSearch();
  }, [query]);

  return (
    <div className='LISTAFILMES' >
    <Container style={{paddingTop:'80px'}}>
      <h1 className="mb-4 text-center">Resultados da Pesquisa: {query}</h1>
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

export default PesquisaResultados;
