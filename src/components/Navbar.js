import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchGenres } from '../api';
import { Navbar, Nav, Form } from 'react-bootstrap';
import '../styles.css';

const AppNavbar = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    if (e.target.value) {
      navigate(`/genero/${e.target.value}`);
    }
  };

  return (
    
    <Navbar  expand="lg" className="NAVBARR" fixed='top' >
      <Navbar.Brand as={Link} to="/" style={{color:'white'}}>Início</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/filmes" style={{color:'white'}}>Populares</Nav.Link>
          <Nav.Link as={Link} to="/favoritos" style={{color:'white'}}>Meus Favoritos</Nav.Link>
          <Nav.Link as={Link} to="/Sobre" style={{color:'white'}}>Sobre</Nav.Link>
          
          <select
            value={selectedGenre} 
            onChange={handleGenreChange} 
            className="ms-3 mt-2 mt-lg-0"
            aria-label="Selecione um gênero"
            style={{ width: '200px' }}
          >
            <option value="">Escolha por gênero</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
};

export default AppNavbar;
