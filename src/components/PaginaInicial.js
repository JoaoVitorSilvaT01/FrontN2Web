import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import capaImagem from './CAPA.png';

const PaginaInicial = () => {
  return (
    <div style={{backgroundColor:'#001523'}}>
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#001523'}}>

      <img 
       src={capaImagem} 
        alt="Banner do site" 
        className="img-fluid mb-4" 
        style={{ maxWidth: '500px', width: '100%' }}
      />
      
      <Button as={Link} to="/filmes" variant="primary" size="lg">
        VER FILMES
      </Button>
    </Container>
    </div>
  );
};

export default PaginaInicial;
