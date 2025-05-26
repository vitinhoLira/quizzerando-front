import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";


export default function Header() {
    const {signOut} = useContext(AuthContext)

    const handleLogout = () => {
        signOut()
    }

    return (
        <Navbar expand="lg" className="bg-primary text-white" data-bs-theme="dark">
            <Container fluid className="row-gap-2">
                <Navbar.Brand as={Link} to="/" className="me-4 pe-4">
                    <img alt="Logo símbolo" src="/brand/logo_symbol.svg" width="30" height="30" className="d-inline-block align-top me-3" />
                    <img src="/brand/logo_text.svg" alt="Logo texto" height="30" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="gap-2">

                    <Nav className="ms-auto text-body-primary column-gap-2 row-gap-1">
                        <Nav.Link as={Link} to="/" className="text-white text-indigo-50 bg-hover-primary border-light-subtle rounded-pill px-3 pe-auto ">Home</Nav.Link>
                        <Nav.Link as={Link} to="/historico" className="text-white text-indigo-50 bg-hover-primary border-light-subtle rounded-pill px-3 pe-auto ">Histórico</Nav.Link>
                        <Nav.Link as={Link} to="/perfil" className="text-white text-indigo-50 bg-hover-primary border-light-subtle rounded-pill px-3 pe-auto ">Perfil</Nav.Link>
                        <Nav.Link as={Link} onClick={handleLogout} className="text-white bg-hover-primary rounded-pill px-3 pe-auto">Sair</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}