import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API_URL from '../../API.route';
import { AuthContext } from "../../contexts/AuthContexts";


const ModalCentralizado = ({ show, onHide, children, setReload,reload }) => {
    const {userId ,token,role} = useContext(AuthContext)
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    
          
      
    
    useEffect(() => {
        if (!show) {
            
            setValidated(false)
        }
    }, [show]);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = document.getElementById('formConteudo');
        
        if (!form.checkValidity()) {
            setValidated(true);
            form.reportValidity()
            return;
        }
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (data.senha) {
            if (data.senha !== data.confirmeSenha) {
                alert('Confirme a senha corretamente')
                return;
            }
            delete data.confirmeSenha
        }
        data.role=role
        console.log("role:"+data.role)
        
    
        
        console.log(data)
        fetch(API_URL+"/usuario/edit/"+userId,{
            method:"PUT",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(resp=>console.log(resp))
        setReload(!reload)

        
        onHide();
        navigate('/perfil')
        
    };
    return (
        
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <Form id='formConteudo' noValidate validated={validated} >
                    {children}
                    <div className='d-flex justify-content-center mt-3'>
                        <Button onClick={handleSubmit} >Salvar Alteração</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

    )
}
export default ModalCentralizado;