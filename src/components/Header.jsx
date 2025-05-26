import { useContext } from "react";
import { Button, Container, Form, InputGroup, Nav, Navbar } from "react-bootstrap";
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

                    {/* <div className="my-auto col-12 col-lg-5 mx-auto mb-1">
                        <InputGroup className="">
                            <Form.Control
                                placeholder="Buscar quiz"
                                aria-label="Buscar quiz"
                                aria-describedby="basic-addon2"
                                className="bg-light border-light
                                shadow-sm focus-ring-dark rounded-start-pill text-black"
                            />
                            <Button variant="outline-light" id="button-addon2" className="text-white link-primary fs-5 py-0 rounded-end-pill">
                                <i className="fa fa-search mx-1"></i>
                            </Button>
                        </InputGroup>
                    </div> */}

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