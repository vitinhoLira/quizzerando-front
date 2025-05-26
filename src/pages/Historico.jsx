import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../contexts/AuthContexts";
import API_URL from "../API.route";
import { Card, Container, ProgressBar, Row } from "react-bootstrap";
import Loading from "../components/Loading/Loading";
import CardHistorico from "../components/CardHistorico/CardHistorico";

export default function HistoricoQuizzes() {
    const { token, userId } = useContext(AuthContext)
    const [historico, setHistorico] = useState([])
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true)
        fetch(`${API_URL}/usuario/${userId}/resultados`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => { return res.json() })
            .then(res => {
                setHistorico(res);
            })
            .catch(error => console.error(error))
            .finally(() => setLoad(false));
    }, [userId, token]);

    let mediaAcertos = 0;
    let quizzesRespondidos = 0;
    let questoesRespondidas = 0;
    let questoesCertas = 0;
    let questoesErradas = 0;

    if (Array.isArray(historico)){
        quizzesRespondidos = historico.length;
    questoesRespondidas = historico.reduce((total, quiz) =>
        total + quiz.acertos + quiz.erros, 0);
    questoesCertas = historico.reduce((total, quiz) =>
        total + quiz.acertos, 0);
    questoesErradas = historico.reduce((total, quiz) =>
        total + quiz.erros, 0);
    mediaAcertos = questoesRespondidas > 0
        ? (questoesCertas / questoesRespondidas) * 100
        : 0;
    }

    console.log('!!', historico)
    return (
        <>
            <Header />


            <Container className="d-flex flex-column row-gap-4 mt-4">

                {load && <Loading />}

                <Card className="mb-4 shadow-sm mx-auto rounded-4 order-1 w-100" style={{maxWidth: '900px'}}>
                    <Card.Body>
                        <Card.Title className="mb-4">Estatísticas Gerais</Card.Title>

                        <div className="text-center col-11 col-md-8 mx-auto my-4 ">
                            <h5 className="text-muted">Média de Acertos</h5>
                            <h4 className="fw-bold mb-3">{mediaAcertos.toFixed(2)}%</h4>
                            <ProgressBar
                                now={mediaAcertos}
                                label={`${mediaAcertos.toFixed(2)}%`}
                                variant={mediaAcertos >= 70 ? 'success' : mediaAcertos >= 50 ? 'warning' : 'danger'}
                                className="mb-2 "
                                style={{ height: '30px' }}
                            />
                        </div>

                        <Row className="row-gap-4 mx-1">
                            <div className="px-2 col-6 col-md-3">
                                <div className="text-center p-3 bg-light rounded">
                                    <h3 className="text-primary">{quizzesRespondidos}</h3>
                                    <p className="mb-0 text-muted">Quizzes Respondidos</p>
                                </div>
                            </div>

                            <div className="px-2 col-6 col-md-3">
                                <div className="text-center p-3 bg-light rounded">
                                    <h3 className="text-primary">{questoesRespondidas}</h3>
                                    <p className="mb-0 text-muted">Questões Respondidas</p>
                                </div>
                            </div>

                            <div className="px-2 col-6 col-md-3">
                                <div className="text-center p-3 bg-light rounded">
                                    <h3 className="text-success">{questoesCertas}</h3>
                                    <p className="mb-0 text-muted">Questões Certas</p>
                                </div>
                            </div>

                            <div className="px-2 col-6 col-md-3">
                                <div className="text-center p-3 bg-light rounded">
                                    <h3 className="text-danger">{questoesErradas}</h3>
                                    <p className="mb-0 text-muted">Questões Erradas</p>
                                </div>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>


                <div className="order-3">
                    {historico.length > 0 && (
                        historico.map((quiz, index) => (
                            <CardHistorico
                                key={index}
                                historicoQuiz={quiz}
                            />
                        ))
                    )}
                </div>
            </Container >
        </>
    )
}