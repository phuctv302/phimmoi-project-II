import React from "react";
import {useState, useEffect} from 'react'
import './Category.scss';
import Navbar from '../navbar/Navbar'
import { useParams } from "react-router";
import { useDispatch } from 'react-redux'
import {getMovieOnCategory} from '../../../../redux/slice/categorySlice'
import {Link} from 'react-router-dom'
function HomeCategory(){
    
    const dispatch = useDispatch()
    const {id} = useParams();
    const[movies, setMovies] = useState([]);
    
    useEffect(async () => {
            const res = await dispatch(getMovieOnCategory(id))
            setMovies(res.payload.data.movies)
        },[id])
    return(
        <div className="category">
            <Navbar/>
            <div className="movies-list">
            {movies.map ((movie) => (
                <div className="movie" key={movie._id}>
                    <Link to={`/movie/${movie._id}`} className="link">
                        <div className="inner">
                        <div className="top">
                            <img src={movie.image} alt="" />
                        </div>
                        <div className="bottom">
                            <div className="info">
                            <p>{movie.name}</p>
                            </div>
                        </div>
                        </div>
                    </Link>
                    </div>
            ))}
    
            </div>
        </div>
        
        
    )

}
export default HomeCategory;