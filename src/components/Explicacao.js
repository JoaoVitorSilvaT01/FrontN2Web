import React from 'react'
import { Container } from 'react-bootstrap'
import diagrama from '../DIAGRAMA.png';
import '../styles.css';


export default function Explicacao() {
  return (
    <Container style={{paddingTop:'80px'}}>
    <div>
      <h1>Blxckbuster</h1>

      <p style={{textAlign: 'justify'}}> Esse projeto foi executado com o intuito de exercitar tanto os conhecimentos de front-end quanto back-end.
         Foi utilizado React com a biblioteca Bootstrap para alterações cosméticas, e no back-end há duas APIs, uma que fornece
          a interface com o TMDB, que é um banco de dados gratuito que contém informações sobre filmes, onde foi feito um cadastro
           e o recebimento de uma chavae API única. Além dessa, há outra API que é a interface com o banco de dados postgresql da
            Vercel, onde são armazendas informções colocadas pelo usuário. Esse projeto foi inspirado na N1, porém agora com mais 
            dinamismo e integração e uma excelente oportunidade de aprendizado. </p>
            <div className='diagrama'>
      <img src={diagrama} ></img>
      </div>
    </div>
    </Container>
  )
}
