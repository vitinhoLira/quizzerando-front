import { Card } from 'react-bootstrap';
import SubmitButton from "../components/Buttons/SubmitButton";
import Form from 'react-bootstrap/Form';
import LogoSideLayer from '../components/LogoSideLayer/LogoSideLayer';
import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContexts';

export default function Login() {
    const [validated, setValidated] = useState(false);
    const { signIn, signed } = useContext(AuthContext);
    const [loginInvalido, setLoginInvalido] = useState('')
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();



    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        setLoginError('');
        setValidated(false);

        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);


        const logado = await signIn(data);
        console.log(logado)
        if (logado === 401){
            setLoginInvalido('Email ou senha incorreto.')
        }

    };

    if (signed) {
        navigate('/');
    }

    return !signed ? (
        <div className='d-flex flex-wrap vh-100 align-items-stretch w-100'>
            <LogoSideLayer />

            <div className="form-login-senha col-12 col-md-7 d-flex flex-column align-items-center justify-content-center">
                <Card style={{ width: '23rem' }} className='p-4 bg-light border-light-subtle rounded-4'>
                    <h4 className='text-center'>Realizar login</h4>

                    <Form id='formLogin' noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Digite o seu email"
                                required
                                onChange={()=>{setLoginInvalido('')}}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, insira um email válido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                name='senha'
                                type="password"
                                placeholder="Digite sua senha"
                                required
                                onChange={()=>{setLoginInvalido('')}}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe uma senha
                            </Form.Control.Feedback>
                        </Form.Group>
                        <span className='text-danger my-0 py-0'>{loginInvalido}</span>

                        <div className="d-flex justify-content-between align-items-bottom mt-1 pt-4">
                            {/* <Link to='/esqueceu-senha' className='mt-auto'>
                                <span>Esqueceu a senha?</span>
                            </Link> */}
                            <SubmitButton value='Entrar' className='ms-auto'/>
                        </div>
                    </Form>
                </Card>
                <p className='text-center mt-4'>
                    Ainda não possui uma conta? <Link to='/cadastro'>Clique aqui</Link> para se cadastrar
                </p>
            </div>
        </div>
    ) : <Outlet/>
}