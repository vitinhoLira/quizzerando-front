import Header from '../components/Header'
import {Button,Card,Form,Col,Row} from 'react-bootstrap';
import { Link} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ModalCentralizado from '../components/Modais/ModalCentralizado';
import API_URL from "../API.route";
import { AuthContext } from "../contexts/AuthContexts";

export default function Perfil(){

    const [modalShowNome, setModalShowNome] = useState(false);
    const [modalShowEmail, setModalShowEmail] = useState(false);
    const [modalShowSenha, setModalShowSenha] = useState(false);
    const [reload, setReload] = useState(true);
    

    const[nome, setNome]=useState("");
    const[email, setEmail]=useState("");
    

    const {userId,token,signOut} = useContext(AuthContext)

    useEffect(()=>{
        console.log("UserId:", userId);

        if (!userId) return;

        fetch(API_URL +"/usuario/"+userId, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                
            })
                .then(res => res.json())
                .then(resp => {
                    console.log(resp);
                    setNome(resp.nome);
                    setEmail(resp.email);
                    
                })
                .catch(err => console.error(err))
	
    },[userId,token,reload]);

    return (
        <>
    {/*Modais*/}

    <ModalCentralizado
        show={modalShowNome}
        onHide={() => setModalShowNome(false)}
        children={
       
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
            Nome:
            </Form.Label>
            <Col sm="20">
            <Form.Control type="text" name="nome" placeholder="Digite seu novo nome"  required/>
            </Col>
        </Form.Group>
        
        }
        setReload={setReload}
        reload={reload}

      />

      <ModalCentralizado
        show={modalShowEmail}
        onHide={() => setModalShowEmail(false)}
        children={

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
            Email:
            </Form.Label>
            <Col sm="20">
            <Form.Control type="text" name="email" placeholder="Digite seu novo email" required/>
            </Col>
        </Form.Group>
        }
        setReload={setReload}
        reload={reload}
      />

      <ModalCentralizado
        show={modalShowSenha}
        onHide={() => setModalShowSenha(false)}
        children={

        <Form.Group as={Row} className="mb-3" >
            
            <Form.Label column sm="3">
            Nova senha:
            </Form.Label>
            <Col sm="20">
            <Form.Control type="password" name="senha" placeholder="Digite sua nova senha" minLength={8} required/>
            </Col>

            <Form.Label column sm="4">
            Confirme senha:
            </Form.Label>
            <Col sm="20">
            <Form.Control type="password" name="confirmeSenha" placeholder="Confirme sua nova senha" minLength={8} required/>
            </Col>
        </Form.Group>
        }
        setReload={setReload}
        reload={reload}

      />

        <Header/>
       
        <div className="form-perfil col-12 d-flex align-items-center justify-content-center vh-100 ">
        
                <Card style={{ width: '50rem' }} className='p-4 bg-light border-light-subtle rounded-4'>
                    <h4 className='text-center'>Seus dados</h4>

                    <Form >

                        <Form.Group className="mb-3">
                            <Form.Label>Nome </Form.Label>
                            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <Form.Control name="nome" type="text" placeholder={nome} disabled />
                            <button
                                onClick={()=>setModalShowNome(true)}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}
                                type="button"
                            >
                            <img src="./brand/edit.svg" alt="edit"  height="40" />
                            </button>
                            </div>

                        </Form.Group>

                        <Form.Group className="mb-3 " >
                            <Form.Label>Email </Form.Label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Form.Control
                                type="email"
                                placeholder={email}
                                
                                disabled
                                />
                               <button
                                onClick={()=>setModalShowEmail(true)}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}
                                type="button"
                            >
                            <img src="./brand/edit.svg" alt="edit"  height="40" />
                            </button>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <Form.Control name='senha' type="password" placeholder="****************"  disabled />
                            <button
                                onClick={()=>setModalShowSenha(true)}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}
                                type="button"
                            >
                            <img src="./brand/edit.svg" alt="edit"  height="40" />
                            </button>
                            </div>
                        </Form.Group>             

                        <div className="d-flex justify-content-between mt-4 pt-4">
                            <Link to='/'>
                                <Button variant="outline-secondary" >
                                    Voltar
                                </Button>
                            </Link>
                            
                                <Button onClick={signOut} >
                                    Sair da Conta
                                </Button>

                        </div>
                    </Form>
                </Card>
 
            </div>
       
    </>
  );
}