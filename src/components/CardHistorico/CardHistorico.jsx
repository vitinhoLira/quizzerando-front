import styles from './CardHistorico.module.css'
import { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import API_URL from "../../API.route";
import categorias from '../../data/categorias.json'
import { AuthContext } from "../../contexts/AuthContexts";

export default function CardHistorico({ historicoQuiz }) {
    const { token } = useContext(AuthContext)
    const [quiz, setQuiz] = useState({})
    const categoria = categorias[quiz.categoria]

    useEffect(() => {
        fetch(`${API_URL}/quizz/${historicoQuiz.quizzId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((res) => { return res.json() })
            .then((res) => setQuiz(res))

    }, [token, historicoQuiz.quizzId])

    return (
        <>
            <Accordion alwaysOpen className={`col-8 ${styles.customAccordion}`}>
                <Accordion.Item eventKey={quiz.id} className={`rounded-4 ${styles.accordionItem}`}>
                    <Accordion.Header className={`d-flex justify-content-between align-items-center rounded-4 ${styles.accordionHeader}`}>
                        <div className="d-flex align-items-center flex-grow-1">
                            <span className={styles.accordionTitle} row={1} col={1}>
                                <i className={categoria}></i>
                            </span>
                            <div className='d-flex flex-column  ps-3'>
                                <span className={`row-1 fw-bold ${styles.quiz_titulo}`}>{quiz.titulo}</span>
                                <span className={`row-1 col-11 col-sm-8 ${styles.quiz_descricao}`} >{quiz.descricao}</span>
                            </div>
                        </div>
                        <div className="d-flex flex-column mx-3">
                            <span className="text-center">Score:</span>
                            <span className={`fs-4 fw-bold ${historicoQuiz.pontuacao >= 80 ? 'text-success' :
                                historicoQuiz.pontuacao >= 50 ? 'text-warning' : 'text-danger'
                                }`}>
                                {historicoQuiz.pontuacao.toFixed(2)}
                            </span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="d-flex justify-content-evenly align-items-center fs-5">
                            <div className="text-success fw-bold">
                                <i className="fa fa-check-circle me-2"></i> Acertos: {historicoQuiz.acertos}
                            </div>
                            <div className="text-danger fw-bold">
                                <i className="fa fa-times me-2"></i> Erros: {historicoQuiz.erros}
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
    )
}