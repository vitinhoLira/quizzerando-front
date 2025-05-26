import { Modal } from 'react-bootstrap';
import { Button, Card, Form } from "react-bootstrap";
import LogoSideLayer from "../components/LogoSideLayer/LogoSideLayer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/Buttons/SubmitButton";
import API_URL from '../API.route';

export default function EsqueceuSenha() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    //O aviso de envio do email
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formEsqueceuSenha'));
        const data = Object.fromEntries(formData);
       

        fetch(`${API_URL}/auth/recovery`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            if (res.status === 200){
                handleShow()
                setTimeout(()=>{
                    handleClose()
                    navigate('/')
                }, 8000)
            }
        })

        
        setValidated(true)
        


    }

    return (

        <div className='d-flex flex-wrap vh-100 align-items-stretch w-100'>
            <LogoSideLayer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>E-mail enviado</Modal.Title>
                </Modal.Header>
                <Modal.Body className='fs-5'>Um link foi enviado para o seu e-mail com as instruções para redefinição de senha.</Modal.Body>
            </Modal>

            <div className="form-esqueceu-senha col-12 col-md-7 d-flex align-items-center justify-content-center ">

                <Card style={{ width: '23rem' }} className='p-4 bg-light border-light-subtle rounded-4'>
                    <h4 className='text-center'>Esqueceu a senha?</h4>
                    <p style={{ color: "gray" }}>
                        Não se preocupe, informe o seu email abaixo para começar o processo de recuperação do acesso à conta.
                    </p>
                    <Form id='formEsqueceuSenha' noValidate validated={validated} onSubmit={handleSubmit} >



                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control name="email" type="email" placeholder="Digite o seu email" required />

                        </Form.Group>

                        <div className="d-flex justify-content-between mt-4 pt-4">
                            <Link to='/login'>
                                <Button variant="outline-secondary">
                                    Voltar
                                </Button>
                            </Link>


                            <SubmitButton value='Enviar' />

                        </div>
                    </Form>
                </Card>





            </div>
        </div>

    )
}