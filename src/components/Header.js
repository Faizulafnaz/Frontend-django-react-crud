import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <div>
      <Navbar expand="lg" className="bg-body-secondary">
       <Container>
        <Navbar.Brand href="#home">CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
            {user && <Nav.Link onClick={()=>navigate('/profile')}>Profile</Nav.Link>}
            {user?
            
              <Nav.Link onClick={logoutUser}>Logout</Nav.Link>:
              <Nav.Link onClick={()=>navigate('/login')}>Login</Nav.Link>}
              
            {user?.is_superuser && <Nav.Link onClick={()=>navigate('/admin')}>Admin</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        

        
    </div>
  )
}

export default Header