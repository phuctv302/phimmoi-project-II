import React,{useEffect,useState} from 'react'
import Sidebar from '../../../components/sidebar/Sidebar.js'
import Navbar from '../../../components/navbar/Navbar'
import Movie from '../../../components/movie/Movie'
import APIapp from '../../../../Client/APIS/APIapp.js'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './MovieofCategory.scss'

const MovieofCategory = () => {
    const { id } = useParams()
    const dispatch= useDispatch()
    const [allMovie, setAllMovie] = useState([])
    const [category,setCategory]= useState()
    useEffect(async () =>{
        const res = await APIapp.get(`categories/${id}/movies`)
        const category= await APIapp.get(`categories/${id}`)
        console.log(res.data)
        setCategory((category.data.data.category.name)) 
        setAllMovie((res.data.data.movies))    
    }, [dispatch])
    let renderMovies = "";
    
    renderMovies = allMovie != null ? (
        allMovie.map((movie) => (
            <Movie key = {movie._id} data = {movie} />
        ))
    ) : (
        <div className="error">
            <h3>{allMovie.Error}</h3>
        </div>
    )

    return (
        <div>
            <Navbar/>
            <div className="admin">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <h3>{category}</h3>
                    <div className='rendermovie'>{renderMovies}</div>
                </div>
            </div>
        </div>
    )
}

export default MovieofCategory