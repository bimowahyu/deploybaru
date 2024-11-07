import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="p-3">
      <Navbar.Brand href="#" style={{ color: 'white' }}>Dinas Perumahan dan Permukiman</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/recap" style={{ color: 'white' }}>Rekapitulasi</Nav.Link>
          <Nav.Link href="/admin/dashboard" style={{ color: 'white' }}>Dashboard</Nav.Link>
          <Nav.Link href="/questionnaire" style={{ color: 'white' }}>Input Data</Nav.Link>
          <button
            className="btn btn-danger ml-2"
            onClick={async () => {
              try {
                await axios.delete("http://localhost:5100/logout", { withCredentials: true });
                sessionStorage.clear();
                navigate("/login"); 
              } catch (error) {
                console.error("Error during logout", error);
              }
            }}
          >
            Logout
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
