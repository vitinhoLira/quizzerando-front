import { Container, Spinner } from "react-bootstrap";

export default function Loading({...props}) {


    return (
        <Container {...props} className="d-flex justify-content-center align-items-center order-2" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando...</span>
            </Spinner>
        </Container>
    )
}