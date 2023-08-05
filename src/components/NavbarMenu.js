
import React from 'react';

import Home from './components/Home'
import ShortTextForm from './components/ShortTextForm'
import LongTextForm from './components/LongTextForm'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

export default function navbarMenu() {
  return (
    <>
    <BrowserRouter>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/ShortTextForm'>Eng/Ger Words</Nav.Link>
          <Nav.Link as={Link} to='/LongTextForm'>Eng/Ger Text</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    <Routes>
        <Route path='/' element={< Home/>} />
        <Route path='/ShortTextForm' element={< ShortTextForm/>} />
        <Route path='/LongTextForm' element={< LongTextForm/>} />
    </Routes>
    </BrowserRouter>
  </>
  
  )
}
