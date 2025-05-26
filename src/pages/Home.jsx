import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard/QuizCard";
import OffCanvas from "../components/OffCanvas/OffCanvas";
import Filtragem from "../components/Filtragem/Filtragem";
import NavPagination from "../components/NavPagination";
import { Link } from "react-router-dom";
import API_URL from "../API.route";
import { AuthContext } from "../contexts/AuthContexts";
import CriarQuizButton from "../components/Buttons/CriarQuizButton";
import Loading from "../components/Loading/Loading";

export default function Home() {
	const [quizzes, setQuizzes] = useState([])
	const [filtros, setFiltros] = useState([])
	const {userId ,token} = useContext(AuthContext)
	const [load, setLoad] = useState(true);

	useEffect(() => {
		setLoad(true)
		fetch(API_URL + "/quizz/", {
			headers:{
				'Authorization': `Bearer ${token}`
			}
		})
		.then((res) => res.json())
		.then(resp => {setQuizzes(resp); console.log(resp)})
		.finally(() => setLoad(false));

		fetch(`${API_URL}/usuario/${userId}`, {
			headers:{
				'Authorization': `Bearer ${token}`
			}
		})
		.then((res) => {return res.json()})

	}, [token, userId])

	// Paginação
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 12;
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	let currentPosts;
	quizzes.length > 0 &&
	(currentPosts = quizzes.slice(indexOfFirstPost, indexOfLastPost))
	

	return (
		<>
			<Header />

			
			<div className="d-flex flex-wrap justify-content-evenly mt-4 col-12">

				<div className="d-flex justify-content-between col-11 px-2">
					<Link to='/quiz/criar' className=" px-4 mx-auto">
						<CriarQuizButton/>
					</Link>

					{/* <OffCanvas button='Filtros' titulo='Filtrar Quizzes'>
						<Link to='/quiz/criar' className="mt-3 mb-4 px-4 mx-auto ">
							<CriarQuizButton/>
						</Link>
						<Filtragem setFiltros={setFiltros} filtros={filtros} />
					</OffCanvas> */}
				</div>


				<section className="d-flex flex-wrap col-11 col-xl-9 row-gap-4 mt-4" style={{ height: "fit-content" }}>
					{load && <Loading/>}


					{quizzes.length > 0 &&
					currentPosts?.map((quiz, key) => (
						<QuizCard key={key} quiz={quiz} setQuizzes={setQuizzes} quizzes={quizzes}/>
					))}


					{(!load && quizzes.length === 0) && <span className="alert alert-light fs-4 fw-medium text-secondary float-center mx-auto mt-4 " role="alert">Não existem quizzes cadastrados </span>
					}
				</section>


				{/* <aside className="d-none d-xl-flex flex-column border border-dark-subtle rounded-4 h-100 mt-4 pt-3" style={{ width: "21%" }} id='asideDiv'>

					<div className="d-flex flex-column bg-white">
						<Link to='/quiz/criar' className="mx-auto px-4 fw-medium">
							<CriarQuizButton/>
						</Link>
						<hr className="mb-0 pt-0" />
						<h6 className="ps-3 py-2 mb-0 text-bg-light ">Filtrar</h6>
						<hr className="my-0 py-0" />
					</div>

					<Filtragem className="d-none d-xl-flex" id='asideFilter' setFiltros={setFiltros} filtros={filtros} />
				</aside> */}
			</div>

			<NavPagination
				postsPerPage={postsPerPage}
				totalPosts={quizzes.length}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				className='d-flex justify-content-center mt-4 pt-4 col-12'
			/>
		</>
	)
}